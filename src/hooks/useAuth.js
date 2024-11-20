"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (email, password, name, username) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                username,
                email,
                createdAt: serverTimestamp(),
            });

            setLoading(false);
            return user;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return { register, login, loading, error };
};

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Returns user object
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Pass the error back for handling
    }
};

// Function to log out a user
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

// Function to track the logged-in user state
export const monitorAuthState = (callback) => {
    onAuthStateChanged(auth, callback);
};

export default useAuth;
