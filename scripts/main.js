// Initialize provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
const contractABI = await fetch('abi/FundAllocationABI.json').then(res => res.json());
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Fetch transactions
async function fetchTransactions() {
    try {
        const transactions = await contract.getTransactions();
        console.log(transactions);
        // Populate table dynamically
    } catch (err) {
        console.error("Error fetching transactions", err);
    }
}

fetchTransactions();