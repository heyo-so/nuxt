import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';
import type { HeyoApi } from './types.js';

// Extend the Window interface so TypeScript knows about the external widget.
declare global {
    interface Window {
        HEYO?: Partial<HeyoApi> & { _ready?: boolean };
        __HEYO_INITIALIZED__?: boolean;
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const heyoCfg = config.public.heyo as {
        projectId?: string;
        showByDefault?: boolean;
        endpoint?: string;
    } | undefined;

    if (import.meta.client) {
        // Prevent running inside iframes or multiple times
        if (window.self !== window.top || window.__HEYO_INITIALIZED__) {
            return;
        }
        window.__HEYO_INITIALIZED__ = true;

        // Check if we're in dev mode without projectId

        // Build the script URL using the same pattern as index.vue
        // If projectId is provided, use it. Otherwise, let the script auto-detect from host.
        const queryParams = new URLSearchParams();
        if (heyoCfg?.projectId) {
            queryParams.set('projectId', heyoCfg.projectId);
        }
        if (heyoCfg?.showByDefault === false) {
            queryParams.set('hidden', 'true');
        }
        const query = queryParams.toString();
        const scriptWeb = heyoCfg?.endpoint || 'https://heyo.so';
        const scriptSrc = `${scriptWeb.replace(/\/$/, '')}/embed/script${query ? `?${query}` : ''}`;

        // Only inject once.
        if (!document.querySelector('script[data-heyo-script]')) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.defer = true;
            script.setAttribute('data-heyo-script', 'true');
            document.head.appendChild(script);
        }

        // Initial visibility is now handled by the script via query parameter

        // Show success message when loaded
        const checkAndLog = () => {
            if (window.HEYO?._ready) {
                console.log('💬 [Heyo]: Chat module loaded successfully');
            } else {
                setTimeout(checkAndLog, 100);
            }
        };
        checkAndLog();
    }

    // Plugin only injects the script, composable handles the API
    // No need to provide $heyo anymore since useHeyo() handles everything
});
