import { ref, onMounted, readonly, getCurrentInstance, toRaw, isProxy } from 'vue'
import type { HeyoApi, UseHeyoReturn } from '../types.js'

type QueuedAction = {
    action: keyof HeyoApi
    args: unknown[]
}

/**
 * Provides a typed interface to interact with the Heyo chat widget.
 */
export const useHeyo = (): UseHeyoReturn => {
    const isReady = ref(false)
    const isLoading = ref(true)
    const actionQueue = ref<QueuedAction[]>([])

    // Execute queued actions when widget is ready
    const executeQueue = () => {
        while (actionQueue.value.length > 0) {
            const { action, args } = actionQueue.value.shift()!
            const fn = window.HEYO?.[action] as (...fnArgs: unknown[]) => unknown
            if (fn) fn(...args)
        }
    }

    // Queue an action to execute when ready
    const queueAction = (action: keyof HeyoApi, args: unknown[] = []) => {
        if (isReady.value) {
            const fn = window.HEYO?.[action] as (...fnArgs: unknown[]) => unknown
            if (fn) fn(...args)
        } else {
            actionQueue.value.push({ action, args })
        }
    }

    // Wait for HEYO to be ready
    const waitForReady = () => {
        if (window.HEYO?._ready) {
            isReady.value = true
            isLoading.value = false
            executeQueue()
            return
        }
        setTimeout(waitForReady, 100)
    }

    // Ensure we run in the right context – if called inside component setup, use onMounted
    if (getCurrentInstance()) {
        onMounted(() => {
            waitForReady()
        })
    } else {
        // Called outside of a component; run immediately
        waitForReady()
    }

    const api: HeyoApi = {
        show: () => queueAction('show'),
        hide: () => queueAction('hide'),
        open: () => queueAction('open'),
        close: () => queueAction('close'),
        // Ensure we only pass plain, structured-clone-compatible data to the widget –
        // Vue reactive objects, functions, Symbols, etc. would otherwise trigger a
        // `DataCloneError` inside the embed when it forwards the payload with
        // postMessage(). We unwrap Vue proxies with `toRaw()` and then run a
        // JSON round-trip as a cheap way to remove anything that cannot be
        // cloned by the structured-clone algorithm (Dates, Sets, functions …).
        // If the round-trip fails we fall back to an empty object so the call
        // still goes through without breaking the widget.
        identify: (meta: Record<string, unknown>) => {
            let safeMeta: Record<string, unknown> = {};

            try {
                const unwrapped = isProxy(meta) ? toRaw(meta) : meta;
                // Strip non-serialisable fields
                safeMeta = JSON.parse(JSON.stringify(unwrapped));
            } catch {
                // Ignore – fall back to empty object so we don't crash the app
            }

            queueAction('identify', [safeMeta]);
        },
    }

    return {
        ...api,
        isReady: readonly(isReady),
        isLoading: readonly(isLoading),
    }
} 