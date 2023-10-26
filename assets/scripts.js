//Récupération des taches eventuellement stockées dans le localStorage
let taches = window.localStorage.getItem('taches')
if (taches === null) {
    // Récupération des taches depuis l'API
    const reponse = await fetch('./taches.json')
    taches = await reponse.json()
    // Transformation des taches en JSON
    const valeurTaches = JSON.stringify(taches)
    // Stockage des informations dans le localStorage
    window.localStorage.setItem('taches', valeurTaches)
    await genererTaches(taches)
} else {
    taches = JSON.parse(taches)
    await genererTaches(taches)
}

// Fonction d'affichage des taches dans la section correspondante
async function genererTaches(task) {
    console.log(task)
    let todoListHTML = ''
    task.taches.forEach((todo) => {
        todoListHTML += `<article class='list-element'>
                <p class='list-element__content'>${todo.content}</p>
                <button title='delete'  class='list-element__delete'>
                    <i class='fa-solid fa-trash'></i>
                </button>
            </article>`
    })
    document.querySelector('.list').innerHTML = todoListHTML
}

// Récupération des boutons "Delete"
const deleteElement = document.querySelectorAll('.list-element__delete')
for (let i = 0; i < deleteElement.length; i++) {
    deleteElement[i].addEventListener('click', function () {
        deleteTodo()
    })
}

// Fonction de suppression de la tache dans le fichier JSON et rafraichissement de la liste
function deleteTodo(id) {
    console.log(id)

    // Effacement et régénération de la liste
    // document.querySelector('.list').innerHTML = ''
    // genererTaches(taches)
}
