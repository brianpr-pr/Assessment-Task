document.addEventListener("DOMContentLoaded", () => {
    let description = "";

    document.getElementById('description').addEventListener('input', () => {
        description = document.getElementById('description').value.trim();
    });

    document.getElementById('add-task').addEventListener("click", () => {
        let contentTask = document.getElementById('content-task');
        
        //If description is not empty we add new task to the list else show error message
        if(description !== ""){
            if(contentTask.querySelector(".error-message") !== null)
                contentTask.removeChild( contentTask.querySelector(".error-message") );
            addTask(description);
        } else{
            if(contentTask.querySelector(".error-message") === null)
                contentTask.appendChild(createErrorMessage("Error Message"));
        }
    });
});


// Returns a h5 element containing the argument that we passed
function createErrorMessage(errorMessage){
    ele = document.createElement("h5");
    let text = document.createTextNode(errorMessage);
    ele.appendChild(text);
    ele.style.color = "red";
    ele.classList.add('error-message');
    return ele;
}

function addTask(description){
    let taskList = document.getElementById('task-list');

    let liElement = document.createElement("li");
    taskList.appendChild(liElement);
    let divElement = document.createElement("div");
    divElement.classList.add("task-item", "d-flex-column");
    liElement.appendChild(divElement);


    let h4Element = document.createElement("h4");
    h4Element.style.textAlign = "center";
    let h4Content = document.createTextNode("Description");
    h4Element.appendChild(h4Content);
    divElement.appendChild(h4Element);

    let pElement = document.createElement("p");
    let pContent = document.createTextNode(description);
    pElement.appendChild(pContent);
    divElement.appendChild(pElement);

    let buttonElement = document.createElement("button");
    let buttonContent = document.createTextNode("Delete Task");
    buttonElement.appendChild(buttonContent);
    divElement.appendChild(buttonElement);
}