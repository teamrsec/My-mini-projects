document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filters button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
        if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

        if (filteredTasks.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'task-item';
            empty.innerHTML = `<span class="empty-state">No tasks yet. Add one above! 🚀</span>`;
            taskList.appendChild(empty);
            return;
        }

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
            `;
            taskList.appendChild(li);
        });
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(getCurrentFilter());
    }

    function deleteTask(index) {
        if (confirm('Delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(getCurrentFilter());
        }
    }

    function getCurrentFilter() {
        const activeBtn = document.querySelector('.filters button.active');
        return activeBtn ? activeBtn.id.replace('filter', '').toLowerCase() : 'all';
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        
        tasks.unshift({
            text: text,
            completed: false,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks(getCurrentFilter());
    }

    // Event listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(btn.id.replace('filter', '').toLowerCase());
        });
    });

    // Initial render
    renderTasks();
});