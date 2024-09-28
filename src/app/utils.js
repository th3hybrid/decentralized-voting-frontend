"use client";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function connectWithMetamask() {
    console.log("calling connect with metamask");
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
        console.log(provider);
    } else {
        provider = await new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        signer = await provider.getSigner();
        console.log(signer);
        return await provider.send("eth_requestAccounts", [0]);
    }
}
connectWithMetamask();

// Utility to cast a vote
export async function vote(candidate) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    const tx = await contract.vote(candidate);
    console.log("user cast vote",tx);
    return tx;
}

// Utility to check a candidate's votes
export async function checkVotes(candidate) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const candidateVotes = await contract.checkVotes(candidate);
    console.log("candidate votes",candidateVotes);
    return {
        votes: candidateVotes.toString(),
    }
}

// Utility to check time left
export async function checkTimeLeft() {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const timeLeft = await contract.checkTimeLeft();
    console.log("time left:",timeLeft);
    return {
        timeLeft: timeLeft[0].toString(),
        elapsed: timeLeft[1],
    }
}

// Utility to select winner
export async function selectWinner() {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const winner = await contract.selectWinner();
    console.log("winner:",winner);
    return {
        winner: winner.toString(),
    }
}



// Utility to get the candidates
export async function getCandidates() {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const candidates = await contract.getCandidates();
    console.log("candidates:",candidates);
    console.log(Array.from({ length: candidates.length }, (_, i) => candidates[i]));
    return {
        candidates: Array.from({ length: candidates.length }, (_, i) => candidates[i])
    }
    
}

// Utility to get the voter status
export async function getVoteStatus(voterAddress) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const voter = await contract.getVoteStatus(voterAddress);
    console.log("voter",voter);
    return {
        voter:voter,
    }
}