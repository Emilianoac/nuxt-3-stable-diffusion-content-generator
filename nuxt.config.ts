// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui"
  ],
  runtimeConfig: {
    stableDiffusionKey: process.env.STABLE_DIFFUSION_KEY
  }
})
