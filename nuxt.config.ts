// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Pixur | AI Image generator", 
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
  hooks: {
    'vite:extendConfig' (viteInlineConfig, env) {
      viteInlineConfig.server = {
        ...viteInlineConfig.server,
        hmr: {
          protocol: 'ws',
          host: 'localhost',
        },
      }
    },
  },
})
