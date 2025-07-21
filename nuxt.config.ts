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
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/test-utils",
  ],
  runtimeConfig: {
    stableDiffusionKey: process.env.STABLE_DIFFUSION_KEY,
    public: {
      FIREBASE_API_KEY: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    }
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
  routeRules: {
    "/gallery/**": {ssr: false}
  }
})