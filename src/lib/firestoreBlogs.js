import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Add a new blog post
export const addBlogPost = async (subtopicId, title, content, tags = []) => {
    if (!subtopicId || !title || !content) {
        throw new Error("Missing required fields");
    }
    try {
        const blogRef = collection(db, "blogs");
        await addDoc(blogRef, { subtopicId, title, content, tags });
        console.log("Blog post added successfully!");
    } catch (error) {
        console.error("Error adding blog post:", error);
    }
};

// Fetch blogs for a specific subtopic
export const fetchBlogsForSubtopic = async (subtopicId) => {
    if (!subtopicId) throw new Error("Subtopic ID is required");
    try {
        const blogsQuery = query(collection(db, "blogs"), where("subtopicId", "==", subtopicId));
        const querySnapshot = await getDocs(blogsQuery);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
};
