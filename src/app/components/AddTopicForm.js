import { useState } from "react";
import { addTopic } from "../../lib/firestoreTopics";

export default function AddTopicForm({ userId, onTopicAdded }) {
    const [name, setName] = useState("");
    const [subjects, setSubjects] = useState("");
    const [tags, setTags] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [deadline, setDeadline] = useState("");
    const [masteryLevel, setMasteryLevel] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const topicData = {
            name,
            subjects: subjects.split(",").map((s) => s.trim()),
            tags: tags.split(",").map((t) => t.trim()),
            difficulty,
            deadline,
            masteryLevel: parseInt(masteryLevel),
            subTopics: [],
        };

        try {
            await addTopic(userId, topicData);
            alert("Topic added successfully!");
            onTopicAdded(); // Refresh topics
        } catch (error) {
            alert("Error adding topic: " + error.message);
        }
    };

return (
<div className="bg-transparent flex items-center p-10">
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-lg rounded-lg text-blue-700 max-w-md">
        <h2 className="text-2xl font-bold text-blue-700">Add a New Topic</h2>

        <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
                placeholder="Enter topic name"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-2">Subjects (comma-separated)</label>
            <input
                type="text"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
                placeholder="e.g., Math, Science"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
                placeholder="e.g., Algebra, Physics"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-2">Difficulty</label>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-semibold mb-2">Deadline</label>
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-2">Mastery Level (1-10)</label>
            <input
                type="number"
                min="1"
                max="10"
                value={masteryLevel}
                onChange={(e) => setMasteryLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
                placeholder="1 to 10"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition-all"
        >
            Add Topic
        </button>
    </form>
</div>


    );
}
