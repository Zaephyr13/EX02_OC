// Récupération des éléments du DOM
const inputfield = document.querySelector('.main__field')
const addElement = document.querySelector('.main__add')
const deleteElement = document.querySelectorAll('.list-element__delete')
const listElement = document.querySelector('.list')

// Affichage des éléments du Local Storage au chargement de la page
document.addEventListener('DOMContentLoaded', getTasks)

// Affectation de l'action au bouton "Add"
addElement.addEventListener('click', addItem)

// Affectation de l'action au bouton "Delete"
listElement.addEventListener('click', checkOrDelete)

// Fonction d'ajout d'une nouvelle tache dans la section "List"
function addItem(e) {
    e.preventDefault()
    const elementTask = document.createElement('Article')
    elementTask.classList.add('list-element')
    let todoListHTML = `<p class='list-element__content'>${inputfield.value}</p>
    <button title='delete'  class='list-element__validate'>
    <i class='fa-solid fa-check'></i>
    </button>
    <button title='delete'  class='list-element__delete'>
    <i class='fa-solid fa-trash'></i>
    </button>`
    elementTask.innerHTML = todoListHTML
    listElement.appendChild(elementTask)
    saveTask(inputfield.value)
    inputfield.value = ''
}

// Choix de la fonction "Delete" ou "Check"
function checkOrDelete(e) {
    const element = e.target
    if (element.classList[0] === 'list-element__delete') {
        deleteTask(element)
    }

    if (element.classList[0] === 'list-element__validate') {
        validTask(element)
    }
}

// Fonction de suppression de la tache
function deleteTask(element) {
    element.parentElement.remove()
    removeTask(element.parentElement)
}

// Fonction de validation de la tache
function validTask(element) {
    element.parentElement.classList.toggle('validate')
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
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Récupération des éléments stockés dans le LocalStorage
function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (element) {
        const elementTask = document.createElement('Article')
        elementTask.classList.add('list-element')
        let todoListHTML = `<p class='list-element__content'>${element}</p>
    <button title='delete'  class='list-element__validate'>
    <i class='fa-solid fa-check'></i>
    </button>
    <button title='delete'  class='list-element__delete'>
    <i class='fa-solid fa-trash'></i>
    </button>`
        elementTask.innerHTML = todoListHTML
        listElement.appendChild(elementTask)
    })
}
