import {
  defineNuxtModule,
  addPlugin,
  addImports,
  createResolver,
  addTemplate,
} from "@nuxt/kit";
import type { HeyoConfig } from "@heyo.so/js";

export interface HeyoModuleOptions extends HeyoConfig {
  /**
   * Enable or disable the module.
   * @default true
   */
  enabled?: boolean;
}

export default defineNuxtModule<HeyoModuleOptions>({
  meta: {
    name: "heyo-chat",
    configKey: "heyo",
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },
  defaults: {
    enabled: true,
    projectId: undefined,
    hidden: false,
  },
  setup(moduleOptions, nuxt) {
    if (!moduleOptions.enabled) return;

    if (nuxt.options.dev && !moduleOptions.projectId) {
      console.warn(
        "💬 [Heyo]: Heyo is disabled in localhost. You can enable it by adding a projectId in your Nuxt config (see docs for details)."
      );
    }

    const resolver = createResolver(import.meta.url);

    // Expose options to the public runtime config
    nuxt.options.runtimeConfig.public.heyo = {
      projectId: moduleOptions.projectId,
      hidden: moduleOptions.hidden,
      scriptSrc: moduleOptions.scriptSrc,
    };

    // Add client-side plugin
    addPlugin({
      src: resolver.resolve("runtime/plugin.client"),
      mode: "client",
    });

    // Add composable
    addImports({
      name: "useHeyo",
      from: resolver.resolve("runtime/composables/use-heyo"),
    });

    // Add types
    addTemplate({
      filename: "types/heyo.d.ts",
      src: resolver.resolve("runtime/templates/heyo.d.ts"),
    });
  },
});
