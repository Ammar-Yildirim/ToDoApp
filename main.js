const inputBox = document.querySelector('.inputBox');
const tasks = document.querySelector('.tasks');
const addButton = document.querySelector('.addButton');
const filter = document.querySelector('.filter');

addButton.addEventListener('click', addTask);
tasks.addEventListener('click', removeItem);
inputBox.addEventListener('keypress', keyAddTask);
filter.addEventListener('click', filterDisplay);

tasks.innerHTML = localStorage.getItem("code");

function removeItem(e){
    const item = e.target;
    const parent = item.parentElement;
    if(item.classList[0] === 'trashButton'){
        parent.classList.add('removalAnimation');
        parent.addEventListener('transitionend', function() {
            parent.remove();
            localStorage.setItem("code", tasks.innerHTML);
        });
    }
    if(item.classList[0] === 'completedButton'){
        item.parentElement.childNodes[0].classList.toggle('completed');
        localStorage.setItem("code", tasks.innerHTML);
    } 
}

function addTask(e){
    const task = document.createElement("div");
    task.classList.add('task');

    const text = document.createElement("li");
    if(!inputBox.value){
        alert("Empty string not accepted");
        return;
    }
    text.innerText = inputBox.value;

    const completedButton = document.createElement("button");
    completedButton.classList.add('completedButton');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    const trashButton = document.createElement("button");
    trashButton.classList.add('trashButton');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    inputBox.value = "";
    task.append(text,completedButton,trashButton);
    tasks.append(task);

    localStorage.setItem("code", tasks.innerHTML);
}

function keyAddTask(e){
    if(e.key === 'Enter'){
        addTask(e);
    }
}

function filterDisplay(e){
    const allTasks = tasks.childNodes; 
    switch(e.target.value){
        case 'All':
            allTasks.forEach( (task) => {
                task.style.display = 'flex';
            })
            break;
        case 'Completed':
            allTasks.forEach( (task) => {
                if(task.childNodes[0].classList[0] == 'completed'){
                    task.style.display = 'flex';
                }else{
                    task.style.display = 'none';
                }
            })
            break;
        case 'Uncompleted':
            allTasks.forEach( (task) => {
                if(task.childNodes[0].classList[0] != 'completed'){
                    task.style.display = 'flex';
                }else{
                    task.style.display = 'none';
                }
            })
            break;
    }
}