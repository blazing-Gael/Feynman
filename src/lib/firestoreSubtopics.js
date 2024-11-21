import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const addSubtopic = async (userId, topicId, subtopic) => {
    try {
        if (!userId || !topicId || !subtopic) {
            throw new Error("Invalid input: userId, topicId, or subtopic is undefined.");
        }

        const subtopicsRef = collection(db, "users", userId, "topics", topicId, "subtopics");

        const docRef = await addDoc(subtopicsRef, subtopic);
        console.log("Subtopic added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding subtopic:", error);
        throw error;
    }
};
