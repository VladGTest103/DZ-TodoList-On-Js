const URL = "https://jsonplaceholder.typicode.com/todos";

var editTaskForm = document.getElementById('editTask');

let messageBox = document.querySelector('.message__box');

function viewMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.add('active');
}

function removeMessage() {
    messageBox.classList.remove('active');

}

async function editTask() {

    let oldCaption = document.querySelector('#oldCaption').value;
    let oldStatus = document.querySelector('#oldStatus').value;

    let updateCaption = document.querySelector('#updateCaption').value;
    let updateStatus = document.querySelector('#updateStatus').value;

    let completed = false;

    let newCompleted = false;

    switch (oldStatus) {
        case "doneTask":
            completed = true;
            break;
        case "onWayTask":
            completed = false;
            break;
    }

    switch (updateStatus) {
        case "doneTask":
            newCompleted = true;
            break;
        case "onWayTask":
            newCompleted = false;
            break;
    }

    let editID = 0;

    const response = await fetch(URL);
    const tasks = await response.json();

    for (const task of tasks) {
        if (task.title === oldCaption && task.completed === completed) {
            editID = task.id;
        }
    }
    if(editID !== 0){
        if (oldCaption != '' && updateCaption != '') {
            fetch(`https://jsonplaceholder.typicode.com/todos/${editID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updateCaption,
                    completed: newCompleted,
                }),
            })
                .then(response => response.json())
                .then(task => {
                    alert('Task updated successfully:\n' + JSON.stringify(task));
                    console.log(JSON.stringify(task));
                })
                .catch(error => console.error('Error updating task:', error));
            messageBox.style.border = "1px solid black";
            messageBox.style.color = "white";
            messageBox.style.backgroundColor = "green";
            setTimeout(removeMessage(), 5000);
            viewMessage("Задача успешно обновлена");
        } else {
            messageBox.style.border = "1px solid black";
            messageBox.style.color = "white";
            messageBox.style.backgroundColor = "red";
            setTimeout(removeMessage(), 5000);
            viewMessage("Необходимо заполнить все поля!");
        }
    }else{
        messageBox.style.border = "1px solid black";
        messageBox.style.color = "white";
        messageBox.style.backgroundColor = "red";
        setTimeout(removeMessage(), 5000);
        viewMessage("Задачи с таким названием не существует в коллекции!");
    }

}

const submitBtn = document.querySelector('#submitUpdate');

editTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    document.addEventListener('DOMContentLoaded', editTask());
});
