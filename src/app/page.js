"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { doc, setDoc, collection , getDoc} from "firebase/firestore";
import { db } from "../lib/firebase";

import { useAuthContext } from "../hooks/AuthContext";
import { logoutUser } from "../hooks/useAuth";
import LoginPage from "./login/page"; // Importing your LoginPage
import RegisterPage from "./register/page"; // Importing your RegisterPage

import { fetchTopics } from "../lib/firestoreTopics";
import AddTopicForm from "./components/AddTopicForm";
// import dynamic from "next/dynamic";
// const ComponentWithWindow = dynamic(() => import("../../lib/firebase"), { ssr: false });



export default function HomePage({userId}) {
    const { user, loading } = useAuthContext();
	const [userData, setUserData] = useState(null);

	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const [topics, setTopics] = useState([]);


	useEffect(() => {
    	if (user) {
        	const fetchUserData = async () => {
            	try {
                	const userDoc = await getDoc(doc(db, "users", user.uid));
                	if (userDoc.exists()) {
                    	setUserData(userDoc.data());
                	} else {
                    	console.error("User document not found!");
                	}
            	}catch (error) {
                	console.error("Error fetching user data: ", error);
            	}
        	};
        	fetchUserData();
    	}
	}, [user]);

	const loadTopics = async () => {
        const data = await fetchTopics(user.uid);
        setTopics(data);
    };

    useEffect(() => {
        if (user) loadTopics();
    }, [user]);

	if (loading) return <p>Loading...</p>;

	if (!user) {
    	return (
        	<div>
            	<h1>Welcome to the Home Page</h1>
            	<p>
                	Please <button onClick={() => setShowLogin(true)}>Log In</button> or{" "}
                	<button onClick={() => setShowRegister(true)}>Register</button>
            	</p>
            	{/* Modal for Login */}
            	{showLogin && (
                	<div className="modal">
                		<LoginPage setShowLogin={setShowLogin} />
                	</div>
              	)}
            	{/* Modal for Register */}
            	{showRegister && (
                	<div className="modal">
                    	<RegisterPage setShowRegister={setShowRegister} />
                	</div>
            	)}
        	</div>
    	);
    }

	return (
    	<div>

        	<h1>Welcome, {userData?.name || "User"}</h1>
        	<p>Email: {user.email}</p>
        	<p>Username: {userData?.username || "No username"}</p>
        	<button onClick={logoutUser}>Log Out</button>
        	{/* You can add more user details here */}

			<h1>Welcome, here are your topics</h1>
            <AddTopicForm userId={user.uid} onTopicAdded={loadTopics} />
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        {topic.name} - {topic.difficulty} - {topic.deadline}
                    </li>
                ))}
            </ul>

    	</div>
	);
}






// const addUser = async (userId, name, username, email) => {
//    try {
//        await setDoc(doc(db, "users", userId), {
//            name,
//            username,
//            email,
//        });
//        console.log("User added successfully!");
//    } catch (error) {
//        console.error("Error adding user:", error);
//    }
// };

// // Example usage:
// addUser("user123", "John Doe", "johndoe", "johndoe@example.com");



// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
