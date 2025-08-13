export default defineNuxtConfig({
  modules: ["../src/module"],

  devtools: { enabled: true },
  heyo: {
    hidden: true,
    // projectId: "687e0dafa3eb23dbb37f692f", live version
    projectId: "6889b0ce2a44dc1696f3c4d5", // local version
    scriptSrc: "http://localhost:3000/embed/script",
  },
  compatibilityDate: "2025-07-28",
});
