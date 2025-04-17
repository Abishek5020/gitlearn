document.getElementById('fraudForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const amount = parseFloat(document.getElementById('amount').value);
    const time = parseFloat(document.getElementById('time').value);
    const location = document.getElementById('location').value.trim();
    const history = parseInt(document.getElementById('history').value);
  
    // Mock logic to simulate fraud prediction
    let isFraud = false;
  
    // Simple example logic
    if (amount > 1000 || history === 1 || location === '') {
      isFraud = true;
    }
  
    const result = document.getElementById('result');
    if (isFraud) {
      result.innerHTML = "🚨 This transaction looks **fraudulent**!";
      result.style.color = "red";
    } else {
      result.innerHTML = "✅ Transaction seems legitimate.";
      result.style.color = "green";
    }
  });
  