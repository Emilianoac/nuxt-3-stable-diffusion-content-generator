
export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const imageStore = useImageStore();
  const { $authService } = useNuxtApp();

  $authService.listenToAuthChanges((user) => {
    userStore.updateUser(user);

    if (!user) imageStore.$reset();
  });
});