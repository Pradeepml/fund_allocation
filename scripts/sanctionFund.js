document.getElementById("sanction-btn").addEventListener("click", () => {
    const receiver = document.getElementById("receiver").value;
    const projectName = document.getElementById("project-name").value;
    const amount = parseInt(document.getElementById("amount").value, 10);
    const totalFunds = parseInt(document.getElementById("total-funds").textContent, 10);
    const remainingBalanceElement = document.getElementById("remaining-balance");
    const sanctionList = document.getElementById("sanction-list");
  
    // Validate Inputs
    if (!receiver || !projectName || !amount || amount <= 0) {
      alert("Please fill out all fields correctly!");
      return;
    }
  
    const remainingBalance = parseInt(remainingBalanceElement.textContent, 10);
    if (amount > remainingBalance) {
      alert("Insufficient funds! Please enter a smaller amount.");
      return;
    }
  
    // Update Remaining Balance
    remainingBalanceElement.textContent = remainingBalance - amount;
  
    // Add to Sanction Table
    const newRow = document.createElement("tr");
    const timeStamp = new Date().toLocaleString();
    newRow.innerHTML = `
      <td>${timeStamp}</td>
      <td>${projectName}</td>
      <td>${receiver}</td>
      <td>${amount}</td>
    `;
    sanctionList.appendChild(newRow);
  
    // Clear Inputs
    document.getElementById("receiver").value = "";
    document.getElementById("project-name").value = "";
    document.getElementById("amount").value = "";
  });
  