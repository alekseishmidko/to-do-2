const dom = {
    new : document.querySelector('#new'),
    add : document.querySelector('#add'),
    tasks : document.querySelector('#tasks')
}
const tasks = [];


// отслеживание клика по кнопке добавить задачу
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if (newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = '';
        tasksRender(tasks)
    }
    
   
}
// добавление задачи
function addTask(text, list){
    const timestamp = Date.now();
    const task = {
        id: timestamp,
        text: text,
        isComplete: false,
    }
    tasks.push(task)
    console.log(tasks);
}
// проверка существования задачи в массиве задач
function isNotHaveTask(text, list) {
    let isNotHave = true;
   
   

    list.forEach((task) => {
        if(task.text === text){
            isNotHave = false
        }
       
    })
    return isNotHave;
}

// функция вывода списка задач
function tasksRender(list) {
    let htmlList = '';
   

    list.forEach((task) => {
        const cls = task.isComplete ? 'todo__task todo__task-completed': 'todo__task';
        const checked = task.isComplete ? 'checked' : '';
        const taskHTML = `
            <div id= "${task.id}" class=" ${cls}">
                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}><div class = "todo__checkbox-div"></div>
                </label>

                <div class="todo__task-text"> ${task.text} </div>
                <div class="todo__task-del">-</div>

            </div>
             `
        
        htmlList = htmlList + taskHTML
    
    })
    dom.tasks.innerHTML = htmlList;
   
}
// отслеживание клика по чекбоксу задачи
dom.tasks.onclick = (event) =>{
    const target = event.target;
    const isCheckboxEl = target.classList.contains("todo__checkbox-div")
    const isDeleteEl = target.classList.contains("todo__task-del")
    if(isCheckboxEl){
      
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');
        console.log(taskId);
        changeTaskStatus( taskId, tasks);
        tasksRender(tasks)
    }
    if(isDeleteEl){
        const task = target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask (task.id, tasks);
        tasksRender(tasks)
    }
}
// функция изменения статуса задачи

function changeTaskStatus(id, list){
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete;
        }
    })
}

// функция удаления задачи
function deleteTask (id, list){
    list.forEach((task, idx) => {
        if(task.id == id){
            list.splice(idx , 1);
            console.log(list[idx]);
        }
    })
    console.log(list);
}