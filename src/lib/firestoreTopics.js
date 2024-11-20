import { db } from "./firebase"; // Adjust path as needed
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";

// Add a new topic for the user
export const addTopic = async (userId, topicData) => {
    try {
        console.log("userId as shown,",userId);
        const topicsRef = collection(db, "users", userId, "topics");
        const docRef = await addDoc(topicsRef, topicData);
        console.log("Topic added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding topic_:", error);
        throw error;
    }
};

// Fetch all topics for a user
export const fetchTopics = async (userId) => {
    try {
        const topicsRef = collection(db, "users", userId, "topics");
        const querySnapshot = await getDocs(topicsRef);

        const topics = [];
        querySnapshot.forEach((doc) => {
            topics.push({ id: doc.id, ...doc.data() });
        });

        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
};

// Add a sub-topic to an existing topic
export const addSubTopic = async (userId, topicId, subTopicData) => {
    try {
        const topicRef = doc(db, "users", userId, "topics", topicId);
        const topicDoc = await getDoc(topicRef);
        const currentSubTopics = topicDoc.data().subTopics || [];

        const updatedSubTopics = [...currentSubTopics, subTopicData];
        await setDoc(topicRef, { subTopics: updatedSubTopics }, { merge: true });

        console.log("Sub-topic added successfully.");
    } catch (error) {
        console.error("Error adding sub-topic:", error);
        throw error;
    }
};
