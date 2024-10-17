document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    
    if (taskValue) {
        addTask(taskValue);
        taskInput.value = '';
    }
});

function addTask(task) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    li.textContent = task;
    
    // Add complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = function() {
        li.classList.toggle('completed');
    };
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };
    
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
