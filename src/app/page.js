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
import { addSubtopic } from "../lib/firestoreSubtopics";
// import dynamic from "next/dynamic";
// const ComponentWithWindow = dynamic(() => import("../../lib/firebase"), { ssr: false });



export default function HomePage({userId}) {
    const { user, loading } = useAuthContext();
	const [userData, setUserData] = useState(null);

	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const [topics, setTopics] = useState([]);

	const [subtopicForm, setSubtopicForm] = useState({});
    const [subtopicData, setSubtopicData] = useState({});


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

	const handleAddSubtopic = async (topicId) => {
        const subtopic = subtopicData[topicId];
        if (!subtopic) return;

        try {
            await addSubtopic(user.uid, topicId, {
                name: subtopic.name || "Untitled Subtopic",
                deadline: subtopic.deadline || null,
                description: subtopic.description || "",
                completed: false,
            });

            console.log("Subtopic added successfully!");
            setSubtopicForm((prev) => ({ ...prev, [topicId]: false }));
        } catch (error) {
            console.error("Failed to add subtopic:", error);
        }
    };

    const toggleSubtopicForm = (topicId) => {
        setSubtopicForm((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
    };

    const handleInputChange = (topicId, field, value) => {
        setSubtopicData((prev) => ({
            ...prev,
            [topicId]: { ...prev[topicId], [field]: value },
        }));
    };


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
    	// <div>

        // 	<h1>Welcome, {userData?.name || "User"}</h1>
        // 	<p>Email: {user.email}</p>
        // 	<p>Username: {userData?.username || "No username"}</p>
        // 	<button onClick={logoutUser}>Log Out</button>
        // 	{/* You can add more user details here */}

		// 	<h1>Welcome, here are your topics</h1>
        //     <AddTopicForm userId={user.uid} onTopicAdded={loadTopics} />
		// 	<div className="p-6">
		// 		<h1 className="text-2xl font-bold mb-4">Topics of, {user?.name || "User"}!</h1>
		// 		<div>
		// 			{topics.map((topic) => (
		// 				<div key={topic.id} className="mb-6 border-b pb-4">
		// 					<h2 className="text-xl font-semibold">{topic.name}</h2>
		// 					<p>Difficulty: {topic.difficulty}</p>
		// 					<p>Deadline: {topic.deadline || "No deadline set"}</p>
		// 					<button
		// 						className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
		// 						onClick={() => toggleSubtopicForm(topic.id)}
		// 					>
		// 						Add Subtopic
		// 					</button>
		// 					{subtopicForm[topic.id] && (
		// 						<div className="mt-2 text-blue-700">
		// 							<input
		// 								type="text"
		// 								placeholder="Subtopic Name"
		// 								className="border rounded p-1 mr-2"
		// 								onChange={(e) => handleInputChange(topic.id, "name", e.target.value)}
		// 							/>
		// 							<input
		// 								type="date"
		// 								className="border rounded p-1 mr-2"
		// 								onChange={(e) => handleInputChange(topic.id, "deadline", e.target.value)}
		// 							/>
		// 							<textarea
		// 								placeholder="Description"
		// 								className="border rounded p-1 w-full mt-2"
		// 								onChange={(e) => handleInputChange(topic.id, "description", e.target.value)}
		// 							/>
		// 							<button
		// 								className="bg-green-500 text-white px-2 py-1 rounded mt-2 hover:bg-green-600"
		// 								onClick={() => handleAddSubtopic(topic.id)}
		// 							>
		// 								Save Subtopic
		// 							</button>
		// 						</div>
		// 					)}
		// 					<button
		// 						onClick={() =>
		// 							setTopics((prev) =>
		// 								prev.map((t) =>
		// 									t.id === topic.id
		// 										? { ...t, expanded: !t.expanded }
		// 										: t
		// 								)
		// 							)
		// 						}
		// 						className="text-blue-500"
		// 					>
		// 						{topic.expanded ? "Hide Subtopics" : "Show Subtopics"}
		// 					</button>

		// 					{topic.expanded && (
		// 						<ul className="mt-4 pl-4">
		// 							{topic.subtopics.map((sub) => (
		// 								<li key={sub.id}>
		// 									<div className="flex justify-between">
		// 										<span>{sub.name}</span>
		// 										<span>
		// 											{sub.completed ? "✅" : "❌"}
		// 										</span>
		// 									</div>
		// 									<p>{sub.description}</p>
		// 									<p>Deadline: {sub.deadline || "No deadline"}</p>
		// 								</li>
		// 							))}
		// 						</ul>
		// 					)}
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>

    	// </div>
		<div className="min-h-screen bg-gradient-to-r from-blue-500 to-pink-500 text-white p-6">
			{/* User Info Section */}
			<div className="flex justify-between items-center mb-8">
				<div>
				<h1 className="text-3xl font-bold">
					Welcome, {userData?.name || "User"}!
				</h1>
				<p className="text-sm mt-2">Email: {user.email}</p>
				<p className="text-sm">Username: {userData?.username || "No username"}</p>
				</div>
				<button
				onClick={logoutUser}
				className="bg-pink-400 hover:bg-pink-500 px-4 py-2 rounded shadow-lg text-white"
				>
				Log Out
				</button>
			</div>

			{/* Topics Section */}
			<h2 className="text-2xl font-semibold mb-4">Your Topics</h2>

			{/* Add Topic Button */}
			<div className="mb-6">
				<AddTopicForm userId={user.uid} onTopicAdded={loadTopics} />
			</div>

			{/* Topics List */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{topics.map((topic) => (
				<div
					key={topic.id}
					className="bg-white text-gray-800 p-4 rounded-lg shadow-lg"
				>
					{/* Topic Details */}
					<h3 className="text-xl font-semibold text-blue-600">{topic.name}</h3>
					<p className="text-sm mt-2">Difficulty: {topic.difficulty}</p>
					<p className="text-sm">Deadline: {topic.deadline || "No deadline set"}</p>

					{/* Subtopic Actions */}
					<div className="mt-4">
					<button
						className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
						onClick={() => toggleSubtopicForm(topic.id)}
					>
						Add Subtopic
					</button>
					<button
						className="text-blue-500 underline"
						onClick={() =>
						setTopics((prev) =>
							prev.map((t) =>
							t.id === topic.id
								? { ...t, expanded: !t.expanded }
								: t
							)
						)
						}
					>
						{topic.expanded ? "Hide Subtopics" : "Show Subtopics"}
					</button>
					</div>

					{/* Add Subtopic Form */}
					{subtopicForm[topic.id] && (
					<div className="mt-4 p-3 bg-blue-50 rounded-lg">
						<input
						type="text"
						placeholder="Subtopic Name"
						className="border p-2 rounded w-full mb-2"
						onChange={(e) =>
							handleInputChange(topic.id, "name", e.target.value)
						}
						/>
						<input
						type="date"
						className="border p-2 rounded w-full mb-2"
						onChange={(e) =>
							handleInputChange(topic.id, "deadline", e.target.value)
						}
						/>
						<textarea
						placeholder="Description"
						className="border p-2 rounded w-full mb-2"
						onChange={(e) =>
							handleInputChange(topic.id, "description", e.target.value)
						}
						></textarea>
						<button
						className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
						onClick={() => handleAddSubtopic(topic.id)}
						>
						Save Subtopic
						</button>
					</div>
					)}

					{/* Subtopic List */}
					{topic.expanded && (
					<ul className="mt-4 bg-gray-50 p-3 rounded-lg">
						{topic.subtopics.map((sub) => (
						<li key={sub.id} className="mb-2">
							<div className="flex justify-between items-center">
							<span className="font-medium">{sub.name}</span>
							<span>{sub.completed ? "✅" : "❌"}</span>
							</div>
							<p className="text-sm">Deadline: {sub.deadline || "No deadline"}</p>
							<p className="text-sm italic">{sub.description}</p>
						</li>
						))}
					</ul>
					)}
				</div>
				))}
			</div>
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
