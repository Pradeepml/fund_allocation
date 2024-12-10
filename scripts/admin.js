document.getElementById("add-government-form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const govName = document.getElementById("gov-name").value;
    const role = document.getElementById("role").value;
    const publicAddress = document.getElementById("public-address").value;
  
    try {
      const tx = await contract.addGovernment(govName, role, publicAddress); // Call the smart contract
      await tx.wait();
      document.getElementById("status-message").textContent = "Government added successfully!";
    } catch (error) {
      document.getElementById("status-message").textContent = `Error: ${error.message}`;
    }
  });
  