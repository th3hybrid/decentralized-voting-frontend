"use client"
import { useState } from 'react';
import { checkTimeLeft } from "../app/utils";

const CheckTimeLeft = () => {
    const [timeLeft, setTimeLeft] = useState(null);

    const handleCheckTimeLeft = async () => {
      try {
        const fetchedTimeLeft = await checkTimeLeft();
        setTimeLeft(fetchedTimeLeft);
      } catch (err) {
        console.log("Failed to fetch time left. Please try again.");
        console.error(err);
      }
    };
    return (
        <div className="flex gap-3 mt-4 p-4">
        <button
        onClick={handleCheckTimeLeft}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Check Time Left
        </button>
      {timeLeft !== null && (
        <div>
            <p className="mt-4 text-lg font-semibold">Time left: {timeLeft.timeLeft/60} minutes</p>
            <p className="mt-4 text-lg font-semibold">Time {timeLeft.elapsed ? "has" : "has not"} passed!</p>
        </div>
      )}
        </div>
    )
}

export default CheckTimeLeft