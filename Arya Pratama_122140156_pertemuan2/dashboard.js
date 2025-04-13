class Task {
    constructor(text, status = 'In progress') {
      this.id = Date.now();
      this.text = text;
      this.status = status;
    }
}
  
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');

const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="space-x-2">
          <button class="text-blue-500" onclick="editTask(${task.id})">Edit</button>
          <button class="text-red-500" onclick="confirmDelete(${task.id})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
};
  
const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
      const newTask = new Task(text);
      tasks.push(newTask);
      updateStorage();
      renderTasks();
      taskInput.value = '';
    }
};

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
  
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateStorage();
    renderTasks();
};
  
const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText) {
      task.text = newText;
      updateStorage();
      renderTasks();
    }
};
  
const updateStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
  
addTaskBtn.addEventListener('click', () => addTask());
renderTasks();