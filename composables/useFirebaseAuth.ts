
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"
import type { User } from "firebase/auth";

const globalState = reactive({
  user: null as User | null,
  loading: true
});

export default function () {
  const {$auth} = useNuxtApp();

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword($auth, email, password);
      return true;
    } catch (error) {
      return null;
    }
  };

  async function register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword($auth, email, password);
      return true;
    } catch (error) {
      return null;
    }
  };

  async function logout() {
    try {
      await signOut($auth);
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };

  function getCurrentUser() {
    onAuthStateChanged($auth, (user) => {
      if (user) {
        globalState.user = user;
      } else {
        globalState.user = null;
      }
      globalState.loading = false;
    });
  }

  return {
    login,
    register,
    logout,
    getCurrentUser,
    globalState
  };
};