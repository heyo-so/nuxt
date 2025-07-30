export interface HeyoApi {
    /**
     * Show the chat launcher.
     */
    show(): void

    /**
     * Hide the chat launcher and conversation window.
     */
    hide(): void

    /**
     * Programmatically open the conversation window (acts as if the user clicked the launcher).
     */
    open(): void

    /**
     * Programmatically close the conversation window.
     */
    close(): void

    /**
     * Attach metadata about the current visitor. This metadata is persisted and
     * will be available for future sessions. `userId` is used to find previous sessions.
     *
     * @example
     * ```ts
     * heyo.identify({
     *   userId: '123',
     *   email: 'john@example.com',
     *   plan: 'pro',
     * })
     * ```
     *
     * @param meta Arbitrary key–value pairs describing the visitor.
     */
    identify(meta: Record<string, unknown>): void
}

// New extended return type for the composable
export interface UseHeyoReturn extends HeyoApi {
    /** Indicates when the widget is fully ready */
    isReady: Readonly<import('vue').Ref<boolean>>
    /** Indicates when the widget script is still loading */
    isLoading: Readonly<import('vue').Ref<boolean>>
} 