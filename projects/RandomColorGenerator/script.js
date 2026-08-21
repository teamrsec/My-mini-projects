function generateRandomColor() {
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('colorBox').style.backgroundColor = hex;
    document.getElementById('hexCode').textContent = hex;
}

document.getElementById('generate').addEventListener('click', generateRandomColor);
generateRandomColor(); 