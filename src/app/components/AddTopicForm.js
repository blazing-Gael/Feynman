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
        <form onSubmit={handleSubmit} className="space-y-4 text-blue-700">
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Subjects (comma-separated)</label>
                <input
                    type="text"
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Tags (comma-separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Difficulty</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <div>
                <label>Deadline</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Mastery Level (1-10)</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={masteryLevel}
                    onChange={(e) => setMasteryLevel(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Topic
            </button>
        </form>
    );
}
