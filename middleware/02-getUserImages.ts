export default defineNuxtRouteMiddleware( async (to) => {
  // skip middleware on server
  if (import.meta.server) return;
  const store = useUserStore();
  store.subscribeToUserImages();
});
