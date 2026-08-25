document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filters button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    function renderTasks() {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'active') filteredTasks = tasks.filter(t => !t.completed);
        if (currentFilter === 'completed') filteredTasks = tasks.filter(t => t.completed);

        if (filteredTasks.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'task-item';
            empty.innerHTML = `<span class="empty-state">No tasks yet. Add one above! 🚀</span>`;
            taskList.appendChild(empty);
            return;
        }

        filteredTasks.forEach((task) => {
            const taskIndex = tasks.indexOf(task);
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.index = taskIndex;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.className = 'task-checkbox';
            checkbox.setAttribute('aria-label', `Mark "${task.text}" as complete`);

            const text = document.createElement('span');
            text.className = 'task-text';
            text.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.type = 'button';
            deleteButton.textContent = '🗑';
            deleteButton.setAttribute('aria-label', `Delete "${task.text}"`);

            li.append(checkbox, text, deleteButton);
            taskList.appendChild(li);
        });
    }

    function toggleComplete(index) {
        if (!tasks[index]) return;
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        if (confirm('Delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
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
        renderTasks();
    }

    // Event listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            toggleComplete(Number(e.target.closest('.task-item').dataset.index));
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(Number(e.target.closest('.task-item').dataset.index));
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.id.replace('filter', '').toLowerCase();
            renderTasks();
        });
    });

    // Initial render
    renderTasks();
});