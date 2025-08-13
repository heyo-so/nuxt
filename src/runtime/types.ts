import type { HeyoAPI } from '@heyo.so/js'

// Re-export for convenience
export type { HeyoAPI, HeyoConfig, HeyoIdentifyMeta } from '@heyo.so/js'

// Extended return type for the composable
export interface UseHeyoReturn extends HeyoAPI {
	/** Indicates when the widget is fully ready */
	isReady: Readonly<import('vue').Ref<boolean>>
	/** Indicates when the widget script is still loading */
	isLoading: Readonly<import('vue').Ref<boolean>>
} 