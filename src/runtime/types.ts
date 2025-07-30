export interface HeyoApi {
    show(): void
    hide(): void
    open(): void
    close(): void
    identify(meta: Record<string, unknown>): void
}

// New extended return type for the composable
export interface UseHeyoReturn extends HeyoApi {
    /** Indicates when the widget is fully ready */
    isReady: Readonly<import('vue').Ref<boolean>>
    /** Indicates when the widget script is still loading */
    isLoading: Readonly<import('vue').Ref<boolean>>
} 