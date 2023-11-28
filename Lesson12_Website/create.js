
let messageBox = document.querySelector('.message__box');

function viewMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.add('active');
}

function removeMessage() {
    messageBox.classList.remove('active');

}



const URL = "https://jsonplaceholder.typicode.com/todos";


async function createTask() {

    let completed = false;
    let title = document.getElementById('createCaption').value;
    let statusCheck = document.getElementById('createStatus').value;
    var createTaskForm = document.getElementById('createTask');



    const data = {
        title,
        completed
    };

    createTaskForm.addEventListener('submit', function (event) {
        if (title === '') {
            messageBox.style.border = "1px solid black";
            messageBox.style.color = "white";
            messageBox.style.backgroundColor = "red";
            setTimeout(removeMessage(), 5000);
            viewMessage("Необходимо заполнить все поля!");
        }
        event.preventDefault();

        switch (statusCheck) {
            case "doneTask":
                completed = true;
                break;
            case "onWayTask":
                completed = false;
                break;
        }

    });
    if (title !== '') {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const task = await response.json();
        console.log(task);
        messageBox.style.border = "1px solid black";
        messageBox.style.color = "white";
        messageBox.style.backgroundColor = "green";
        setTimeout(removeMessage(), 5000);
        viewMessage("Задача успешно создана");
    } else {
        messageBox.style.border = "1px solid black";
        messageBox.style.color = "white";
        messageBox.style.backgroundColor = "red";
        setTimeout(removeMessage(), 5000);
        viewMessage("Необходимо заполнить все поля!");
    }



}

const submitBtn = document.querySelector('#submitCreate');

submitBtn.addEventListener('click', () => {
    document.addEventListener('DOMContentLoaded', createTask());

});





