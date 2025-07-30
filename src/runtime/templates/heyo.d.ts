/**
 * Public API exposed by the Heyo chat widget.
 */
export interface HeyoApi {
  /**
   * Makes the widget bubble visible if it was hidden.
   * Equivalent to calling `window.HEYO?.show()`.
   */
  show(): void;

  /**
   * Hides the widget bubble from view (user can no longer open it).
   * Equivalent to `window.HEYO?.hide()`.
   */
  hide(): void;

  /**
   * Programmatically opens the chat window.
   * If the widget is hidden this will first make it visible.
   */
  open(): void;

  /**
   * Closes the chat window if it is currently open.
   */
  close(): void;

  /**
   * Attaches metadata to the current visitor for better identification / segmentation.
   * @param meta Arbitrary key-value pairs – e.g. `{ userId: 42, plan: 'pro' }`.
   */
  identify(meta: Record<string, any>): void;
}

/**
 * Typed composable return including helper refs.
 */
export interface UseHeyoReturn extends HeyoApi {
  /**
   * Reactive flag that becomes `true` once the widget script has finished
   * loading and `window.HEYO` is ready to accept calls.
   */
  isReady: Readonly<import('vue').Ref<boolean>>;

  /**
   * Reactive flag that is `true` while the external script is still loading.
   * Becomes `false` as soon as it is ready.
   */
  isLoading: Readonly<import('vue').Ref<boolean>>;
}

/**
 * Returns a typed and reactive instance of the Heyo widget API.
 *
 * Example:
 * ```ts
 * const heyo = useHeyo()
 * heyo.open()
 * ```
 */
export function useHeyo(): UseHeyoReturn;

// -------------------------------------------------------------------
// Nuxt auto-injections
// -------------------------------------------------------------------

declare module '#app' {
  interface NuxtApp {
    $heyo: HeyoApi;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $heyo: HeyoApi;
  }
}

export {}; 