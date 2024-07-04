
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as refRealTimeDB, onValue, set} from "firebase/database";
import type { ImageData} from "@/types/index";

export default function () {
  const {globalState} = useGlobalState();
  const {$auth, $db, $storage} = useNuxtApp();

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

        const userRef = refRealTimeDB($db, `users/${globalState.user.uid}/images`);
        onValue(userRef, (snapshot) => {
          globalState.images = snapshot.val() as Record<string, ImageData>;
          // sort images by timestamp
          globalState.images = Object.fromEntries(
            Object.entries(globalState.images).sort((a, b) => b[1].timestamp - a[1].timestamp)
          );
        })

      } else {
        globalState.user = null;
      }
      globalState.loading = false;
    });
  };

  async function addToStorage(file: File, name: string) {
    if (!globalState.user || !file) {
      return null;
    }
    const storageRef = refStorage($storage, `users/${globalState.user.uid}/${name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  async function addToDatabase(image: ImageData) {
    if (!globalState.user) {
      return null;
    }
    const userRef = refRealTimeDB($db, `users/${globalState.user.uid}/images/${image.name}`);
    await set(userRef, image );
  }

  return {
    login,
    register,
    logout,
    getCurrentUser,
    addToStorage,
    addToDatabase,
  };
};