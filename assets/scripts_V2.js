// Récupération des éléments du DOM
const inputfield = document.querySelector('.main__field')
const addElement = document.querySelector('.main__add')
const listElement = document.querySelector('.list')
const todoLists = []

// Affichage des éléments du Local Storage au chargement de la page
document.addEventListener('DOMContentLoaded', getTasks)

// Affectation de l'action au bouton "Add"
addElement.addEventListener('click', addItem)

// Affectation de l'action au bouton "Delete"
// listElement.addEventListener('click', checkOrDelete)

// Fonction d'ajout d'une nouvelle tache dans la section "List"
function addItem(e) {
    e.preventDefault()
    todoLists.push(inputfield.value)
    saveTask(inputfield.value)
    showTodoList(todoLists)
    inputfield.value = ''
}

function showTodoList(listOfTodos) {
    let todoListHTML = ''
    listOfTodos.map((list, index) => {
        todoListHTML += `<article class="list-element">
        <p class='list-element__content'>${list}</p>
    <button title='delete' onClick="validTask(event)" class='list-element__validate'>
    <i class='fa-solid fa-check'></i>
    </button>
    <button title='delete' onClick="deleteTask(${index},event)" class='list-element__delete'>
    <i class='fa-solid fa-trash'></i>
    </button>
    </article>`
    })
    listElement.innerHTML = todoListHTML
}

// Fonction de suppression de la tache
function deleteTask(taskID, e) {
    todoLists.splice(taskID, 1)
    removeTask(e.target)
    showTodoList(todoLists)
}

// Fonction de validation de la tache
function validTask(e) {
    e.target.parentElement.classList.toggle('validate')
}

// Fonction de sauvegarde dans le LocalStorage
function saveTask(element) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(element)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Fonction de suppression dans le LocalStorage
function removeTask(element) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    const taskIndex = element.children[0].innerText
    tasks.splice(tasks.indexOf(taskIndex), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Récupération des éléments stockés dans le LocalStorage
function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach(function (element) {
            todoLists.push(element)
        })
        showTodoList(todoLists)
    }
}
