import { ref, readonly, onMounted, getCurrentInstance } from 'vue'
import { HEYO } from '@heyo.so/js'
import type { UseHeyoReturn } from '../types.js'

/**
 * Provides a typed interface to interact with the Heyo chat widget.
 */
export const useHeyo = (): UseHeyoReturn => {
	const isReady = ref(HEYO.ready)
	const isLoading = ref(!HEYO.ready)

	const updateStatus = () => {
		isReady.value = HEYO.ready
		isLoading.value = !HEYO.ready
		if (!HEYO.ready) {
			setTimeout(updateStatus, 100)
		}
	}

	// Ensure we run in the right context – if called inside component setup, use onMounted
	if (getCurrentInstance()) {
		onMounted(updateStatus)
	} else {
		// Called outside of a component; run immediately
		updateStatus()
	}

	return {
		show: HEYO.show,
		hide: HEYO.hide,
		open: HEYO.open,
		close: HEYO.close,
		identify: HEYO.identify,
		ready: HEYO.ready,
		isReady: readonly(isReady),
		isLoading: readonly(isLoading),
	}
} 