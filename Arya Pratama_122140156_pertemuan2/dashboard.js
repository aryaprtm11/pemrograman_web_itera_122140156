// Class untuk Task
class Task {
    constructor(text, category = 'Lesson', status = 'In progress') {
      this.id = Date.now();
      this.text = text;
      this.category = category;
      this.status = status;
    }
}

// State utama
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('category-select');
const addTaskBtn = document.getElementById('add-task');

// Render Task List
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-100 p-3 rounded';
        li.innerHTML = `
        <div>
          <span class="font-medium ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}">${task.text}</span>
          <span class="text-xs text-gray-500 ml-2">[${task.category}]</span>
        </div>
        <div class="space-x-2">
          <button onclick="toggleComplete(${task.id})" class="px-2 py-1 text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-700'} hover:bg-green-200 rounded">
            ${task.status === 'Completed' ? 'Completed' : 'Mark as Done'}
          </button>
          <button onclick="editTask(${task.id})" class="px-2 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded">Edit</button>
          <button onclick="confirmDelete(${task.id})" class="px-2 py-1 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded">Delete</button>
        </div>
      `;
        taskList.appendChild(li);
    });
    updateHeaderStats();
};

// Tambah Task
const addTask = () => {
    const text = taskInput.value.trim();
    const category = taskCategory.value;
    if (text) {
        const newTask = new Task(text, category);
        tasks.push(newTask);
        updateStorage();
        renderTasks();
        taskInput.value = '';

        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Task berhasil ditambahkan.'
        });
    }
};

// Toggle status selesai/tidak
const toggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    task.status = task.status === 'Completed' ? 'In progress' : 'Completed';
    updateStorage();
    renderTasks();
};

// Konfirmasi Hapus Task dengan SweetAlert
const confirmDelete = (id) => {
    Swal.fire({
        title: 'Yakin ingin menghapus?',
        text: 'Tugas ini akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTask(id);
            Swal.fire('Dihapus!', 'Tugas berhasil dihapus.', 'success');
        }
    });
};

// Hapus Task
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateStorage();
    renderTasks();
};

// Edit Task
const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    Swal.fire({
        title: 'Edit Task',
        html: `
        <input id="swal-input1" class="swal2-input" value="${task.text}" placeholder="Task name">
        <select id="swal-input2" class="swal2-input">
          <option value="Lesson" ${task.category === 'Lesson' ? 'selected' : ''}>Lesson</option>
          <option value="Hometasks" ${task.category === 'Hometasks' ? 'selected' : ''}>Hometasks</option>
          <option value="Practicum" ${task.category === 'Practicum' ? 'selected' : ''}>Practicum</option>
        </select>
      `,
        focusConfirm: false,
        preConfirm: () => {
            const newText = document.getElementById('swal-input1').value;
            const newCategory = document.getElementById('swal-input2').value;
            if (newText) {
                task.text = newText;
                task.category = newCategory;
                updateStorage();
                renderTasks();
            }
        }
    });
};

// Update localStorage
const updateStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Update Info Statistic
const updateHeaderStats = () => {
    const lessonStat = calculateCompletion('Lesson');
    const hometaskStat = calculateCompletion('Hometasks');
    const practicumStat = calculateCompletion('Practicum');

    document.getElementById('lesson-completion').innerText = `${lessonStat.percent}%`;
    document.getElementById('lesson-detail').innerText = `${lessonStat.completed} of ${lessonStat.total} lessons`;

    document.getElementById('hometask-completion').innerText = `${hometaskStat.percent}%`;
    document.getElementById('hometask-detail').innerText = `${hometaskStat.completed} of ${hometaskStat.total} hometasks`;

    document.getElementById('practicum-completion').innerText = `${practicumStat.percent}%`;
    document.getElementById('practicum-detail').innerText = `${practicumStat.completed} of ${practicumStat.total} practicum`;
};

const calculateCompletion = (category) => {
    const filtered = tasks.filter(t => t.category === category);
    const total = filtered.length;
    const completed = filtered.filter(t => t.status === 'Completed').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
};

// Event Listener
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});
addTaskBtn.addEventListener('click', () => addTask());

// Asynchronus Fetch
const simulateFetchTasks = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(tasks);
        }, 500);
    });
};

const fetchAndRender = async () => {
    const fetchedTasks = await simulateFetchTasks();
    console.log("Fetched tasks:", fetchedTasks);
    renderTasks();
};

fetchAndRender();