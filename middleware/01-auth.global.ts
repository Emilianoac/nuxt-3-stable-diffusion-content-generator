import useAuth from "@/composables/useAuth";

const publicPaths = ["/"];

export default defineNuxtRouteMiddleware( async (to) => {
  if (import.meta.server) return;

  const store = useUserStore();
  if (store.user) return;

  const { getUser } = useAuth();
  const user = await getUser();

  store.updateUser(user);

  if (!store.user && !publicPaths.includes(to.path)) {
    return navigateTo("/");
  }
});
