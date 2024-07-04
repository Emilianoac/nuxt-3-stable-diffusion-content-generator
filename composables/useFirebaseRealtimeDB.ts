import { ref as refRealTimeDB, onValue, set, update } from "firebase/database"
import type { ImageData } from "@/types/index";
import type { User } from "firebase/auth";
import type { Database } from "firebase/database";

export default function() {

  async function addToDB(db: Database, user: User, image: ImageData) {
    const userRef = refRealTimeDB(db, `users/${user.uid}/images/${image.name}`);
    await set(userRef, image);
  }

  return {
    addToDB
  }
}