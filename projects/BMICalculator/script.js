function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (isNaN(weight) || isNaN(height) || height === 0) {
        alert("Please enter valid numbers");
        return;
    }

    const bmi = weight / (height * height);
    const status = bmi < 18.5 ? "Underweight" : 
                   bmi < 25 ? "Normal" : 
                   bmi < 30 ? "Overweight" : "Obese";

    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('status').textContent = status;
    document.getElementById('result').classList.remove('hidden');
}

document.getElementById('calculate').addEventListener('click', calculateBMI);