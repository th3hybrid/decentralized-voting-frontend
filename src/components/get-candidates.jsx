"use client"
import { useState } from 'react';
import { getCandidates } from "../app/utils";

const GetCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    
    const handleCandidates = async () => {
      try {
        const fetchedCandidates = await getCandidates();
        setCandidates(fetchedCandidates.candidates);
      } catch (err) {
        console.log("Failed to fetch Candidates. Please try again.");
        console.error(err);
      }
    };

    return (
        <div className="flex gap-3 mt-4 p-4">
            <button
        onClick={handleCandidates}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get candidates
        </button>
      {candidates.length > 0 &&
        <div>
          <p className="mt-4 text-lg font-semibold">{candidates[0]}</p>
          <p className="mt-4 text-lg font-semibold">{candidates[1]}</p>
        </div>
      }
        </div>
    )
}

export default GetCandidates