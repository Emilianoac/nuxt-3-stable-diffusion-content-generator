
export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const imageGenerationStore = useImageGenerationStore();
  const { $authService } = useNuxtApp();

  $authService.listenToAuthChanges((user) => {
    userStore.updateUser(user);

    if (!user) imageGenerationStore.$reset();
  });
});