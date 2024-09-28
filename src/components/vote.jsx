"use client"
import { useState } from "react";
import { vote } from "../app/utils"; 

const Vote = () => {
  const [candidate, setCandidate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Call the createUser function from utils.js
      const transaction = await vote(candidate);
      setSuccess("Vote casted successfully!");
      console.log("Transaction:", transaction);
    } catch (err) {
      setError(
        "Failed to create user. Please check the console for more details."
      );
      console.error(err);
    }

    setLoading(false);
  };

    return (
        <div className="flex gap-3 mt-4 p-4">
            <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="candidate"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Name
                </label>
                <input
                  id="candidate"
                  type="text"
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                  placeholder="Input candidate"
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                {loading ? "Casting vote..." : "Vote"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {success && <p className="mt-4 text-green-500">{success}</p>}
          </form>
        </div>
    )
}

export default Vote