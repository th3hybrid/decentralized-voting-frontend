"use client"
import Image from "next/image";
import Navbar from '../components/navbar';
import Vote from '../components/vote';
import CheckVotes from '../components/check-votes';
import CheckTimeLeft from '../components/check-time-left';
import SelectWinner from '../components/select-winner';
import GetCandidates from '../components/get-candidates';
import GetVoteStatus from "@/components/get-vote-status";

export default function Home() {
  return (
    <div className="text-2xl">
      <Navbar/> 
      <Vote/>
      <CheckVotes/>
      <CheckTimeLeft/>
      <SelectWinner/>
      <GetCandidates/>
      <GetVoteStatus/>
    </div>  
  );
}
