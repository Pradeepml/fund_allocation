document.getElementById("add-funds-btn").addEventListener("click", function () {
    document.getElementById("add-funds").style.display = "block";
    document.getElementById("sanction-funds").style.display = "none";
  });
  
  document.getElementById("sanction-funds-btn").addEventListener("click", function () {
    document.getElementById("sanction-funds").style.display = "block";
    document.getElementById("add-funds").style.display = "none";
  });
    
  
  
  document.getElementById("add-funds-form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const amount = document.getElementById("fund-amount").value;
  
    try {
      const tx = await contract.addFunds({ value: ethers.utils.parseEther(amount) }); // Call smart contract
      await tx.wait();
      document.getElementById("status-message").textContent = "Funds added successfully!";
    } catch (error) {
      document.getElementById("status-message").textContent = `Error: ${error.message}`;
    }
  });
  
  document.getElementById("sanction-funds-form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const receiver = document.getElementById("receiver").value;
    const projectName = document.getElementById("project-name").value;
    const amount = document.getElementById("sanction-amount").value;
  
    try {
      const tx = await contract.sanctionFunds(receiver, projectName, ethers.utils.parseEther(amount)); // Call smart contract
      await tx.wait();
      document.getElementById("status-message").textContent = "Funds sanctioned successfully!";
    } catch (error) {
      document.getElementById("status-message").textContent = `Error: ${error.message}`;
    }
  });

  

  