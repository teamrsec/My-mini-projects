const form = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Email validation
    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Password validation
    if (!isValidPassword(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }
    
    // Confirm password
    if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = 'Passwords do not match';
        isValid = false;
    } else {
        confirmError.textContent = '';
    }
    
    if (isValid) {
        alert('✅ Form submitted successfully!');
        form.reset();
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(pass) {
    return pass.length >= 8;
}

// Real-time validation on input
emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) emailError.textContent = '';
});

passwordInput.addEventListener('input', () => {
    if (isValidPassword(passwordInput.value)) passwordError.textContent = '';
});

confirmInput.addEventListener('input', () => {
    if (passwordInput.value === confirmInput.value) confirmError.textContent = '';
});