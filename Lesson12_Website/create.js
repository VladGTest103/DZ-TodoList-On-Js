
let messageBox = document.querySelector('.message__box');

function viewMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.add('active');
}

function removeMessage() {
    messageBox.classList.remove('active');

}



const URL = "https://jsonplaceholder.typicode.com/todos";

async function addTask () {
    let completed = false;
    let title = document.getElementById('createCaption').value;
    let statusCheck = document.getElementById('createStatus').value;
    var createTaskForm = document.getElementById('createTask');
  
    switch (statusCheck) {
      case "doneTask":
        completed = true;
        break;
      case "onWayTask":
        completed = false;
        break;
    }
  
    const data = {
      title,
      completed,
    };
  
    createTaskForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      if (title !== null) {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        const task = await response.json();
        
        const updatedTasksResponse = await fetch(URL);
        const updatedTasks = await updatedTasksResponse.json();
    
        messageBox.style.border = '1px solid black';
        messageBox.style.color = 'white';
        messageBox.style.backgroundColor = 'green';
        setTimeout(removeMessage(), 5000);
        viewMessage('Задача успешно создана');
        return task;
      } else {
        messageBox.style.border = '1px solid black';
        messageBox.style.color = 'white';
        messageBox.style.backgroundColor = 'red';
        setTimeout(removeMessage(), 5000);
        viewMessage('Необходимо заполнить все поля!');

      }
    });
  };



const btnSubmit = document.querySelector('#submitCreate');


btnSubmit.addEventListener('click', () =>{
    addTask();
})



