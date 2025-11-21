document.addEventListener('DOMContentLoaded', () => {

    const addTaskButton = document.getElementById('add-task'); 
    const description = document.getElementById('description');
    
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
            description.value = '';

            const checkBoxNodeList = document.querySelectorAll('.checkbox-task');
            checkBoxNodeList[--checkBoxNodeList.length].addEventListener('click', changeTaskState);
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
 
    const liElement = createElementAndContent('li');
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

    const id = document.querySelectorAll('.checkbox-task').length-1;
    labelElement.htmlFor = `id-${id}-checkbox-task`;
    inputRadioElement.id = `id-${id}-checkbox-task`;

    const buttonElement = createElementAndContent('button','Delete Task');
    divElement.appendChild(buttonElement);
}


//Auxiliar function for creating elements, text and classes are optional
function createElementAndContent(tag, text = '', classes = []) {
    const element = document.createElement(tag);

    if (text) element.textContent = text;
    classes.forEach(cls => element.classList.add(cls));

    return element;
}

const changeTaskState = (event) => {
    //Add line trough style for the description of the task
    if(event.target.checked){
        event.target.parentElement.previousSibling.style.textDecoration = 'line-through';
    }else{
        event.target.parentElement.previousSibling.style.textDecoration = 'none';
    }
}