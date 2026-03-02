// Ethan Marxen 03/02/26
// load the contents of the webpage
document.addEventListener('DOMContentLoaded', function()
{
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;

    // Additional DOM manipulation: creates and inserts a live game count paragraph
    // that updates every time a game is added or removed from the list
    const countParagraph = document.createElement('p');
    countParagraph.id = 'game-count';
    const movieListDiv = document.querySelector('#movie-list');
    movieListDiv.appendChild(countParagraph);

    function updateCount()
    {
        const total = list.querySelectorAll('li').length;
        countParagraph.textContent = total + ' game(s) on the list';
    }

    updateCount();

    // delete games
    list.addEventListener('click', (e) =>
    {
        if (e.target.className === 'delete')
        {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
            updateCount();
        }
    });

    // add games
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function(e)
    {
        e.preventDefault();

        // create elements
        const value = addForm.querySelector('input[type="text"]').value;
        const li = document.createElement('li');
        const gameName = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // add text content
        gameName.textContent = value;
        deleteBtn.textContent = 'delete';

        // add classes
        gameName.classList.add('name');
        deleteBtn.classList.add('delete');

        // append to DOM
        li.appendChild(gameName);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        addForm.querySelector('input[type="text"]').value = '';
        updateCount();
    });

})
