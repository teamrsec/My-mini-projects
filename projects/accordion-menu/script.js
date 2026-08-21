const menuItems = [
    {
        title: "HTML",
        content: `
            <ul>
                <li>Document structure</li>
                <li>Head and body sections</li>
                <li>Headers, footers, and sections</li>
                <li>Forms and inputs</li>
            </ul>
        `
    },
    {
        title: "CSS",
        content: `
            <ul>
                <li>Box model</li>
                <li>Flexbox and Grid</li>
                <li>Media queries</li>
                <li>Transitions and animations</li>
            </ul>
        `
    },
    {
        title: "JavaScript",
        content: `
            <ul>
                <li>DOM manipulation</li>
                <li>Event handling</li>
                <li>Async operations</li>
                <li>Modern ES6+ features</li>
            </ul>
        `
    }
];

const accordion = document.getElementById('accordion');

menuItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'accordion-item';
    div.innerHTML = `
        <div class="accordion-header">
            <span>${item.title}</span>
            <span class="icon">▶</span>
        </div>
        <div class="accordion-content">${item.content}</div>
    `;
    
    accordion.appendChild(div);
    
    // Toggle functionality
    const header = div.querySelector('.accordion-header');
    const content = div.querySelector('.accordion-content');
    const icon = header.querySelector('.icon');
    
    header.addEventListener('click', () => {
        const isActive = content.classList.contains('active');
        
        document.querySelectorAll('.accordion-content').forEach(c => {
            if (c !== content) c.classList.remove('active');
        });
        
        content.classList.toggle('active');
        icon.textContent = content.classList.contains('active') ? '▼' : '▶';
    });
});