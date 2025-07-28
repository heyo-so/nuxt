export interface HeyoApi {
    show(): void
    hide(): void
    open(): void
    close(): void
    identify(meta: Record<string, unknown>): void
} 