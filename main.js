document.addEventListener('DOMContentLoaded', () => {

    const addTaskButton = document.getElementById('add-task'); 
    const description = document.getElementById('description');
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = JSON.parse(localStorage.getItem('tasks') );
    let checkBoxNodeList = document.querySelectorAll('.checkbox-task');
    checkBoxNodeList.forEach(checkbox => {
        checkbox.addEventListener('click', changeTaskState);
    });
    let deleteButton = document.querySelectorAll('.delete-task');
    deleteButton.forEach(task => {
        task.addEventListener('click', deleteTask);
    });    

    document.querySelectorAll('.li-task').forEach(liElementTask => {
        console.log(liElementTask);
        liElementTask.style.display = 'block';
    });

    document.getElementById('filter-task').addEventListener('change', applyFilter);

    description.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            addTaskButton.dispatchEvent(new Event('click'));
        }
    });

    addTaskButton.addEventListener('click', () => {
        const contentTask = document.getElementById('content-task');
        
        //If description is not empty we add new task to the list else show error message
        if(description.value.trim() !== ''){
            if(contentTask.querySelector('.error-message') !== null){
                contentTask.removeChild( contentTask.querySelector('.error-message') );
            }
            addTask(description.value.trim());
            
            localStorage.setItem('tasks', JSON.stringify(taskList.innerHTML));

            description.value = '';

            checkBoxNodeList = document.querySelectorAll('.checkbox-task');
            checkBoxNodeList[--checkBoxNodeList.length].addEventListener('click', changeTaskState);

            deleteButton = document.querySelectorAll('.delete-task'); 
            deleteButton[--deleteButton.length].addEventListener('click', deleteTask);
        }else{
            if(contentTask.querySelector('.error-message') === null){
                contentTask.appendChild(createElementAndContent('h5', 'Please enter a task', ['error-message']));
            }
        }
    });
});

// Creates a new task

//Should i use the innerHTML property?
function addTask(description){
    const taskList = document.getElementById('task-list');

    const liElement = createElementAndContent('li','',['li-task']);
    taskList.appendChild(liElement);
    const divElement = createElementAndContent('div', '', ['task-item', 'd-flex-column']);
    liElement.appendChild(divElement);

    const h4Element = createElementAndContent('h4', 'Description');
    h4Element.style.textAlign = 'center';
    divElement.appendChild(h4Element);

    const pElement = createElementAndContent('p', description);
    divElement.appendChild(pElement);
 
    const subDivElement = createElementAndContent('div');

    const labelElement = createElementAndContent('label', 'Task completed:');
    subDivElement.appendChild(labelElement);

    const inputRadioElement = createElementAndContent('input','',['checkbox-task']);
    inputRadioElement.type = 'checkbox';
    subDivElement.appendChild(inputRadioElement);
    divElement.appendChild(subDivElement);

    const id = --document.querySelectorAll('.checkbox-task').length;
    labelElement.htmlFor = `id-${id}-checkbox-task`;
    inputRadioElement.id = `id-${id}-checkbox-task`;

    const buttonElement = createElementAndContent('button','Delete Task', ['delete-task']);
    divElement.appendChild(buttonElement);
}


//Auxiliar function for creating elements, text and classes are optional
function createElementAndContent(tag, text = '', classes = []) {
    const element = document.createElement(tag);

    if(text) element.textContent = text;
    classes.forEach(cls => element.classList.add(cls));

    return element;
}

const changeTaskState = (event) => {
    //Add line trough style for the description of the task
    if(event.target.checked){
        event.target.parentElement.previousSibling.style.textDecoration = 'line-through';
        event.target.setAttribute('checked', 'checked');
    }else{
        event.target.parentElement.previousSibling.style.textDecoration = 'none';
        event.target.removeAttribute('checked');
    }

    document.getElementById('filter-task').dispatchEvent(new Event('change'));

    localStorage.setItem('tasks', JSON.stringify(document.getElementById('task-list').innerHTML));
}  

const applyFilter = (event) => {
    const taskList = document.getElementById('task-list');
    [...taskList.children].forEach(task => {
        switch(event.target.value){
            case 'all':
                task.style.display = 'block';
                break;

            case 'active':
                task.style.display = 'block';
                if(task.querySelector('input').checked){
                    task.style.display = 'none';
                }
                break;

            case 'completed':
                task.style.display = 'block';
                if(task.querySelector('input').checked === false){
                    task.style.display = 'none';
                }
                break;
        }
    });
}

const deleteTask = (event) =>{
    event.target.parentElement.parentElement.remove();
    localStorage.setItem('tasks', JSON.stringify(document.getElementById('task-list').innerHTML));
}