// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Stable Diffusion generator", 
    }
  },
  modules: [
    "@nuxt/ui",
    "nuxt-csurf",
  ],
  runtimeConfig: {
    stableDiffusionKey: process.env.STABLE_DIFFUSION_KEY
  },
  colorMode: {
    preference: "dark"
  },
})
