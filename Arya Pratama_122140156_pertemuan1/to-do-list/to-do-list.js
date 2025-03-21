function tambahlist() {
    const inputList = document.getElementById('listbaru');
    const isiList = inputList.value.trim();
    if (isiList) {
        const list = document.getElementById('list');
        const listId = Date.now();
        const listBaru = document.createElement('li');
        listBaru.className = 'flex items-center mb-2';
        listBaru.innerHTML = `
            <input type="checkbox" id="toDo-${listId}" class="mr-2 w-5 h-5 mr-4 accent-[#2B2A4C]" onchange="statusBox(this)">
            <label for="toDo-${listId}" class="flex-grow text-xl">${isiList}</label>
            <button onclick="deleteList(${listId})" class="bg-red-500 hover:bg-red-700 text-white px-8 font-bold py-2 rounded-lg ml-2 mt-4">Hapus</button>
        `;
        list.appendChild(listBaru);
        inputList.value = '';
    }
}

function statusBox(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.classList.add('line-through');
    } else {
        label.classList.remove('line-through');
    }
}

function deleteList(listId) {
    const taskElement = document.getElementById(listId);
    if (!taskElement) {
        console.error(`Elemen dengan ID '${listId}' tidak ditemukan.`);
        return;
    }
    const toDo = taskElement.parentElement;
    if (toDo) {
        toDo.remove();
    }

    // Hapus dari Local Storage
    const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
    const updatedToDoList = toDoList.filter(item => item.id !== taskId);
    localStorage.setItem('toDoList', JSON.stringify(updatedToDoList));
}

function saveList() {
    try {
        const toDoList = [];
        const list = document.getElementById('list');
        if (!list) {
            console.error("Elemen dengan ID 'list' tidak ditemukan.");
            return;
        }
        for (let item of list.children) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            if (checkbox && label) {
                const id = checkbox.id;
                toDoList.push({
                    id: id,
                    list: label.textContent,
                    completed: checkbox.checked
                });
            } else {
                console.warn("Elemen checkbox atau label tidak ditemukan dalam item:", item);
            }
        }
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        console.log("Data berhasil disimpan:", toDoList);
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan tugas:", error);
    }
}

function loadList() {
    try {
        const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
        const list = document.getElementById('list');
        if (!list) {
            console.error("Elemen dengan ID 'list' tidak ditemukan.");
            return;
        }
        toDoList.forEach(toDo => {
            const listBaru = document.createElement('li');
            listBaru.className = 'flex items-center mb-2';
            listBaru.innerHTML = `
                <input type="checkbox" id="${toDo.id}" class="mr-2 w-5 h-5 mr-4 accent-[#2B2A4C]" ${toDo.completed ? 'checked' : ''} onchange="statusBox('${toDo.id}')">
                <label for="${toDo.id}" class="text-xl flex-grow ${toDo.completed ? 'line-through' : ''}">${toDo.list}</label>
                <button onclick="deleteList('${toDo.id}')" class="bg-red-500 hover:bg-red-700 text-white px-8 font-bold py-2 rounded-lg ml-2 mt-4">Hapus</button>
            `;
            list.appendChild(listBaru);
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat memuat tugas:", error);
    }
}

window.onload = loadList;