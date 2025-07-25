export default function useAuth() {
  const { $authService, $dbService } = useNuxtApp();
  const userStore = useUserStore();

  const error = ref({ status: false, message: "" });

  async function login(email: string, password: string) {
    userStore.updateLoading(true);
    error.value = { status: false, message: "" };
    try {
      await $authService.login(email, password);
      return true;
    }  catch (err) {
      error.value = {
        status: true,
        message: err instanceof Error ? err.message : "Login failed"
      }
      return false;
    } finally {
      userStore.updateLoading(false);
    }
  }

  async function register(email: string, password: string) {
    userStore.updateLoading(true);
    error.value = { status: false, message: "" };
    try {
      const user = await $authService.register(email, password);
      await $dbService.saveUserProfile(user.user.uid, {
        email: user.user.email,
        uid: user.user.uid
      });
      return user;
    } catch (err) {
      error.value = { 
        status: true, 
        message: err instanceof Error ? err.message : "Registration failed" 
      };
      return null;
    } finally {
      userStore.updateLoading(false);
    }
  }

  async function logout() {
    userStore.updateLoading(true);
    try {
      await $authService.logout();
      return true;
    } catch (err) {
      error.value = {
        status: true,
        message: err instanceof Error ? err.message : "Logout failed"
      }
      return false;
    } finally {
      userStore.updateLoading(false);
    }
  }

  async function getUser() {
    return await $authService.getUser();
  }

  return {
    login,
    register,
    logout,
    getUser,
    
    error,
  };
}