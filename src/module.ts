import {
  defineNuxtModule,
  addPlugin,
  addImports,
  createResolver,
  addTemplate,
} from "@nuxt/kit";

export interface HeyoModuleOptions {
  /**
   * Explicit project ID to load for this site.
   * If omitted, the widget will attempt to resolve it from the host name.
   */
  projectId?: string;
  /**
   * Whether the widget should be visible by default.
   * @default true
   */
  showByDefault: boolean;

  /**
   * Base URL for Heyo assets (e.g., `https://heyo.so`).
   * Used for development purposes only, do not use.
   */
  endpoint?: string;
}

export default defineNuxtModule<HeyoModuleOptions>({
  meta: {
    name: "heyo-chat",
    configKey: "heyo",
  },
  // Default module options
  defaults: {
    projectId: undefined,
    showByDefault: true,
    endpoint: undefined,
  },
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url);

    const isDev = nuxt.options.dev;
    const hasProjectId = moduleOptions.projectId;

    if (isDev) {
      if (!hasProjectId)
        return console.log(
          "💬 [Heyo]: Chat Widget loaded but disabled in localhost (see doc)"
        );
      else console.log("💬 [Heyo]: Chat Widget loaded.");
      //   '💬 [Heyo]: Widget disabled in localhost by default. Add `heyo: { projectId: "your-project-id" }` to your Nuxt config to enable it in development.'
    }

    // -----------------------------------------------------------------
    // Expose options to the public runtime config so the client plugin
    // can access them at runtime without bundling the options twice.
    // -----------------------------------------------------------------
    const existingHeyoConfig =
      (nuxt.options.runtimeConfig.public.heyo as HeyoModuleOptions) || {};

    nuxt.options.runtimeConfig.public.heyo = {
      ...existingHeyoConfig,
      projectId: moduleOptions.projectId,
      showByDefault: moduleOptions.showByDefault,
      endpoint: moduleOptions.endpoint,
    };

    // -----------------------------------------------------------------
    // Register runtime plugin (client-only).
    // -----------------------------------------------------------------
    addPlugin({
      src: resolver.resolve("runtime/plugin.client"),
      mode: "client",
    });

    // -----------------------------------------------------------------
    // Auto-import composable so users can simply call `useHeyo()`.
    // -----------------------------------------------------------------
    addImports({
      name: "useHeyo",
      from: resolver.resolve("runtime/composables/use-heyo"),
    });

    // -----------------------------------------------------------------
    // Provide type augmentation for `$heyo` and the composable.
    // -----------------------------------------------------------------
    addTemplate({
      filename: "types/heyo.d.ts",
      getContents: () =>
        `declare interface HeyoApi {\n  show(): void;\n  hide(): void;\n  open(): void;\n  close(): void;\n  identify(meta: Record<string, any>): void;\n}\n\ndeclare module '#app' {\n  interface NuxtApp {\n    $heyo: HeyoApi;\n  }\n}\n\ndeclare module 'vue' {\n  interface ComponentCustomProperties {\n    $heyo: HeyoApi;\n  }\n}\nexport {};`,
    });
  },
});
