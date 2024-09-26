export default defineNuxtRouteMiddleware( async (to) => {
  // skip middleware on server
  if (import.meta.server) return;
  const store = useUserStore();
  await store.getUser();
  if (!store.user) navigateTo("/");
});
