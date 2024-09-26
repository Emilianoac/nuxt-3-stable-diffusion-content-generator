
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as refRealTimeDB, onValue, set, get, child} from "firebase/database";
import type { ImageData} from "@/types/index";
import type { User } from "firebase/auth";

export default function () {
  const {$auth, $db, $storage} = useNuxtApp();

  class FirebaseProvider {
    private auth: typeof $auth;
    private db: typeof $db;
    private storage: typeof $storage;

    constructor() {
      this.auth = $auth;
      this.db = $db;
      this.storage = $storage;
    }

    async register(email: string, password: string) {
      try {
        const user = await createUserWithEmailAndPassword(this.auth, email, password);
        await set(refRealTimeDB(this.db, `users/${user.user.uid}`), { uid: user.user.uid, email: user.user.email });
        return user;
      } catch (error) {
        return null;
      }
    };

    async login(email: string, password: string) {
      try {
        const res = await signInWithEmailAndPassword(this.auth, email, password);
        return res;
      } catch (error) {
        return null;
      }
    };

    async logout() {
      try {
        await signOut(this.auth);
      } catch (error) {
        console.error(error);
      }
    };

    async getUser() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, (user) => {
          if (!user) resolve(null);
          resolve(user);
        });
      }) as unknown as User | null;
    };

    async getUserImages(user: any): Promise<ImageData[] | null> {
      if (!user) return null; 
    
      const userRef = refRealTimeDB(this.db, `users/${user.uid}/images`);
      return new Promise((resolve) => {
        onValue(userRef, (snapshot) => {
          if (!snapshot.exists()) resolve(null);
          
          let images = snapshot.val() as Record<string, ImageData>;
          const imageArray = Object.values(images).sort((a, b) => b.timestamp - a.timestamp);
          resolve(imageArray);
        });
      });
    }

    async getSingleImage(userId: string, imageId: string) {
      const dbRef = refRealTimeDB(this.db);
      const snapshot = await get(child(dbRef,`users/${userId}/images/${imageId}`));
      if (!snapshot.exists()) return null;
      return snapshot.val() as ImageData;
    }

    subscribeToUserImages(user: User, callback: (images: ImageData[]) => void) {
      if (!user) return;
  
      const userRef = refRealTimeDB(this.db, `users/${user.uid}/images`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          callback([]);
          return;
        }
  
        const images = snapshot.val() as Record<string, ImageData>;
        const imageArray = Object.values(images).sort((a, b) => b.timestamp - a.timestamp);
        callback(imageArray);
      });
  
      // Retornar la función de desuscripción
      return unsubscribe;
    }

    async addFileToStorage(file: File, userId: string) {
      if (!userId || !file) return null;
  
      const storageRef = refStorage(this.storage, `users/${userId}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
  
        return url;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    async addFileToDatabase(image: ImageData, userId: string) {
      if (!userId) return null;
      try {
        const imageName = image.name.split(".")[0];
        const userRef = refRealTimeDB(this.db, `users/${userId}/images/${imageName}`);
        await set(userRef, image );

      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }

  return {
    FirebaseProvider
  };
};