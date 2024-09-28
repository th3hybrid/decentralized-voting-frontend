"use client";
import { useState } from "react";
import { getVoteStatus } from "../app/utils"; 

const GetVoteStatus = () => {
  const [hasVoted, setHasVoted] = useState(); 
  const [voter, setVoter] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const voteStatus = await getVoteStatus(voter);
      setHasVoted(voteStatus);
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
            htmlFor="voter"
            className="block text-sm font-medium text-black mb-1"
          >
            ADDRESS
          </label>
          <input
            id="voter"
            type="text"
            placeholder="Enter Voter"
            value={voter}
            onChange={(e) => setVoter(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white hover:bg-emerald-600 transition-colors rounded"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Check Vote status"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {hasVoted && (
        <div className="mt-4 p-4 border-t border-black">
          <p>{voter}  {hasVoted ? "has" : "has not"} voted</p>
        </div>
      )}
        </div>
    )
}

export default GetVoteStatus