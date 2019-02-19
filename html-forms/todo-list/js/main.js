'use strict';

const tasks = document.getElementsByTagName('input');
const result = document.getElementsByTagName('output')[0];
const listBlock = document.getElementsByClassName('list-block')[0];

document.addEventListener('DOMContentLoaded', completeTask);

for (const task of tasks) {
    task.addEventListener('click', completeTask)
}

function completeTask() {
    let completedTasks = Array.from(tasks).filter(task => task.checked);

    result.value = `${completedTasks.length} из ${tasks.length}`;

    (completedTasks.length === tasks.length) ? listBlock.classList.add('complete') : listBlock.classList.remove('complete');
}

