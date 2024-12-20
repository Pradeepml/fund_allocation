// Import ethers.js
import { ethers } from "ethers";

let contract;
let provider;
let signer;
let currentAccount;

// Smart Contract Details
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "addFunds",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "admin",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "balances",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "central",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getTransactions",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "sanctionedProject",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "internalType": "struct GovernmentFund.Transaction[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "projectName",
      "type": "string"
    }
  ],
  "name": "sanctionFunds",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "adr",
      "type": "address"
    }
  ],
  "name": "specCentral",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "transactions",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "timestamp",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "sanctionedProject",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
]



// Initialize the connection to the smart contract
async function connectToContract() {
  if (window.ethereum) {
    try {
      // Request account access from MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set provider and signer
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      currentAccount = await signer.getAddress();

      // Connect to the contract
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log("Connected to contract:", contractAddress);
      console.log("Current account:", currentAccount);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

connectToContract();

window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      console.log("MetaMask is locked or no account is connected");
    } else {
      currentAccount = accounts[0];
      signer = provider.getSigner(currentAccount);
      console.log("Account switched to:", currentAccount);
    }
  });

  async function addFunds(toAddress, amount) {
    try {
      const tx = await contract.addFunds(toAddress, ethers.utils.parseEther(amount));
      await tx.wait(); // Wait for transaction to be mined
      console.log("Funds added successfully!");
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  }

  async function sanctionFunds(toAddress, amount, projectName) {
    try {
      const tx = await contract.sanctionFunds(
        toAddress,
        ethers.utils.parseEther(amount),
        projectName
      );
      await tx.wait();
      console.log("Funds sanctioned successfully!");
    } catch (error) {
      console.error("Error sanctioning funds:", error);
    }
  }

  async function viewTransactions() {
    try {
      const transactions = await contract.getTransactions();
      console.log("Transactions:", transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  async function getBalance(address) {
    try {
      const balance = await contract.balances(address);
      console.log("Balance for", address, ":", ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }