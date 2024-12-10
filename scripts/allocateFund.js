document.getElementById("allocate-btn").addEventListener("click", () => {
    const fundsInput = document.getElementById("funds");
    const fundAmount = parseInt(fundsInput.value, 10);
    const totalFundsElement = document.getElementById("total-funds");
    const fundList = document.getElementById("fund-list");
  
    if (!fundAmount || fundAmount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
  
    // Update Total Allocated Funds
    const currentTotal = parseInt(totalFundsElement.textContent, 10);
    const newTotal = currentTotal + fundAmount;
    totalFundsElement.textContent = newTotal;
  
    // Add entry to table
    const newRow = document.createElement("tr");
    const timeStamp = new Date().toLocaleString();
    newRow.innerHTML = `
      <td>${timeStamp}</td>
      <td>${fundAmount}</td>
    `;
    fundList.appendChild(newRow);
  
    // Clear input field
    fundsInput.value = "";
  });
  