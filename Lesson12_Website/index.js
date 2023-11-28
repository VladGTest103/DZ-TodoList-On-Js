
const URL = "https://jsonplaceholder.typicode.com/todos";

async function getTasks() {
  const response = await fetch(URL);
  const tasks = await response.json();

  for (const task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.classList.add(`main__tasks-item`);
    taskElement.classList.add(`active-${task.id}`);
    taskElement.innerHTML = `
        <input type="checkbox" name="doneStatus" id="doneStatus" ${task.completed === true ? 'checked' : ''}></input>
        <div class="main__tasks-item-descr">${task.title}</div>
        <button onClick="deleteTask(${task.id})" id="deleteTask">Удалить задачу</button>
        `;
    document.querySelector(".main__tasks").appendChild(taskElement);
  }
}


document.addEventListener('DOMContentLoaded', getTasks());

function deleteTask(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE"
  });

  const taskElement = document.querySelector(`.active-${id}`);
  taskElement.remove();
}




const goTopBtn = document.querySelector(".go-top");


window.addEventListener("scroll", trackScroll);

goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  
  const scrolled = window.pageYOffset;
  
  const coords = document.documentElement.clientHeight;
  
  if (scrolled > coords) {
    
    goTopBtn.classList.add("go-top--show");
  } else {
    
    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {
 
  if (window.pageYOffset > 0) {
   
    window.scrollBy(0, -75); 
    setTimeout(goTop, 0); 
  }
}