// allows the form to function

// Declare variables
let addList = document.getElementById('add-list');
let listContainer = document.getElementById('items-list');

// Add event listeners
addList.addEventListener('click', addEvent); // calls the function that adds the item to the list
listContainer.addEventListener('click', removeEvent); // calls the function that removes the item
listContainer.addEventListener('click', crossOff); // calls the function that crosses-off the item

function addEvent(e)
{
    e.preventDefault(); //values will appear in the list - from the jquery library
    let displayList = document.createElement('li');
    let inputValue = document.getElementById('new-item').value;

    displayList.textContent = inputValue;
    displayList.className = 'list-group-item mb-2 w-75'; //Bootstrap class

    let completeTask = document.createElement("img");
    completeTask.setAttribute('src', 'images/checkMark.png');
    completeTask.className = 'mr-2 img-margin btn btn-sm btn-info float-right'; //Bootstrap button
    completeTask.style.height = '30px';

    let deleteTask = document.createElement('button');
    deleteTask.innerHTML = 'x';
    deleteTask.className = 'btn btn-sm btn-danger float-right mr-2'; //Bootstrap button

    if(inputValue)
    {
        displayList.appendChild(completeTask);
        displayList.appendChild(deleteTask);
        listContainer.appendChild(displayList);
        addList.reset();
    }
}

//To delete list//
function removeEvent(e)
{
    if(e.target.classList.contains('btn-danger')) // type of Bootstrap button
    {
        if (confirm('Are you sure?')) // window confirm method
        {
            let list = e.target.parentElement;
            listContainer.removeChild(list);
        }
    }
}

//To check-off list//
function crossOff(e)
{
    if(e.target.classList.contains('img-margin'))
    {
        let list = e.target.parentElement;
        list.classList.toggle('cross');
    }
}
