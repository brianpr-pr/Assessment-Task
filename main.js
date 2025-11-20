document.addEventListener('DOMContentLoaded', () => {

    const addTaskButton = document.getElementById('add-task'); 
    const description = document.getElementById('description');
    
    description.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
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
        }else {
            if(contentTask.querySelector('.error-message') === null){
                contentTask.appendChild(createErrorMessage('Please enter a task'));
            }
        }
    });
});


// Returns a h5 element containing the argument that we passed
function createErrorMessage(errorMessage){
    const errorMessageElement = createElementAndContent('h5', errorMessage, ['error-message']);
    return errorMessageElement;
}

// Creates a new task
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