"use client"
import { useState } from 'react';
import { selectWinner,checkVotes } from "../app/utils";

const SelectWinner = () => {
    const [winner, setWinner] = useState(null);
    const [candidateVotes, setCandidateVotes] = useState("");
    
    const handleSelectWinner = async () => {
      try {
        const fetchedWinner = await selectWinner();
        setWinner(fetchedWinner);
        const votes = await checkVotes(winner);
        setCandidateVotes(votes);
      } catch (err) {
        console.log("Failed to fetch winner. Please try again.");
        console.error(err);
      }
    };

    return (
        <div className="flex gap-3 mt-4 p-4">
            <button
        onClick={handleSelectWinner}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Select Winner
        </button>
      {winner !== null && (
        <p className="mt-4 text-lg font-semibold">{winner.winner} won with {candidateVotes.votes} votes</p>
      )}
        </div>
    )
}

export default SelectWinner