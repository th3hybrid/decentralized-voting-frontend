"use client";
import { useState } from "react";
import { checkVotes } from "../app/utils"; 

const CheckVotes = () => {
 const [candidateVotes, setCandidateVotes] = useState(""); 
  const [candidate, setCandidate] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const votes = await checkVotes(candidate);
      setCandidateVotes(votes);
    } catch (err) {
      setError("Failed to fetch user details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="flex gap-3 mt-4 p-4">
            <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label
            htmlFor="candidate"
            className="block text-sm font-medium text-black mb-1"
          >
            ID
          </label>
          <input
            id="candidate"
            type="text"
            placeholder="Enter Candidate"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white hover:bg-emerald-600 transition-colors rounded"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Check Votes"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {candidateVotes && (
        <div className="mt-4 p-4 border-t border-black">
          <h3 className="text-lg font-bold">Candidate Votes</h3>
          <p>{candidate}: {candidateVotes.votes} votes</p>
        </div>
      )}
        </div>
    )
}

export default CheckVotes