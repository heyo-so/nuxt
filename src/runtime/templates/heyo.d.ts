import type { UseHeyoReturn } from '../types.js'

declare module '#app' {
	interface NuxtApp {
		/** Heyo chat API */
		$heyo: UseHeyoReturn
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		/** Heyo chat API */
		$heyo: UseHeyoReturn
	}
}

export {}
