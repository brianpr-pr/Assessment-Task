document.addEventListener("DOMContentLoaded", () => {
    let description = "";

    document.getElementById('description').addEventListener('input', () => {
        description = document.getElementById('description').value.trim();
        console.log("Description" , description);
    });

    document.getElementById('add-task').addEventListener("click", () => {
        let contentTask = document.getElementById('content-task');
        
        //If description is not empty we add new task to the list else show error message
        if(description !== ""){
            console.log(ele);
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