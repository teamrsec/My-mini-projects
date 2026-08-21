function calculateTip() {
    const bill = parseFloat(document.getElementById('billAmount').value);
    const tipPercent = parseFloat(document.getElementById('tipPercentage').value);

    if (isNaN(bill) || bill <= 0) {
        alert("Please enter a valid bill amount");
        return;
    }

    const tipAmount = (bill * tipPercent) / 100;
    const total = bill + tipAmount;

    document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
}

document.getElementById('calculate').addEventListener('click', calculateTip);