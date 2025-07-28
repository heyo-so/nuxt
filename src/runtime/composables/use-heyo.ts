import { ref, onMounted, readonly } from 'vue'
import type { HeyoApi } from '../types.js'

type QueuedAction = {
    action: keyof HeyoApi
    args: unknown[]
}

export const useHeyo = () => {
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

    onMounted(() => {
        waitForReady()
    })

    const api: HeyoApi = {
        show: () => queueAction('show'),
        hide: () => queueAction('hide'),
        open: () => queueAction('open'),
        close: () => queueAction('close'),
        identify: (meta: Record<string, unknown>) => queueAction('identify', [meta]),
    }

    return {
        ...api,
        isReady: readonly(isReady),
        isLoading: readonly(isLoading),
    }
} 