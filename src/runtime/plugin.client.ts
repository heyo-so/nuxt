import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";
import { HEYO } from "@heyo.so/js";
import type { HeyoConfig } from "./types.js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const heyoConfig = config.public.heyo as HeyoConfig;

  // The JS package already prevents multiple initialisations
  HEYO.init(heyoConfig);

  // Optional: log when ready
  const checkAndLog = () => {
    if (HEYO.ready) {
      console.log("💬 [Heyo]: Chat module loaded successfully");
    } else {
      setTimeout(checkAndLog, 100);
    }
  };
  checkAndLog();
});
