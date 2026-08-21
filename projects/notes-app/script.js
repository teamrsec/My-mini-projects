let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = '';
    
    notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteNote(${index})">✕</button>
            <h3>${note.title}</h3>
            <p>${note.content.replace(/\n/g, '<br>')}</p>
            <div class="meta">
                ${new Date(note.date).toLocaleDateString()} • ${new Date(note.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
            </div>
        `;
        grid.appendChild(card);
    });
}

function deleteNote(index) {
    if (confirm('Delete this note?')) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function saveNote() {
    const textarea = document.getElementById('noteInput');
    const text = textarea.value.trim();
    if (!text) return;
    
    notes.unshift({
        title: text.split('\n')[0] || 'Untitled',
        content: text,
        date: Date.now()
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
    textarea.value = '';
    renderNotes();
}

document.getElementById('saveBtn').addEventListener('click', saveNote);
document.getElementById('noteInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveNote();
    }
});

// Initial render
renderNotes();