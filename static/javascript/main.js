function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

let heroDisplay = document.querySelector('#hero-display')

let heroURL = "api/heroes/"

function heroBuild(url){
    fetch(url,{
        method: 'GET',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Request-With': 'XMLHttpRequest',
            'X-CSRFToken':csrftoken,
            }
    })

    .then(response => {
        return response.json()
    })

    .then(heroArray => {
        console.log(heroArray)
        console.log(heroDisplay)
        for (let hero of heroArray){
            console.log(hero)
            let heroItem = document.createElement('li')
            heroItem.innerText = ` ${hero.name} |  ${hero.alias}`
            // heroItem.classList.add('border')
            let deleteButton = document.createElement('button')
            deleteButton.innerText = "Destory Hero"
            deleteButton.classList.add('button', 'is-danger')
            deleteButton.setAttribute('data-pk', hero.pk)
            heroItem.append(deleteButton)
            heroItem.setAttribute('id', hero.pk)
            heroDisplay.appendChild(heroItem)

            deleteButton.addEventListener('click', event => {
                console.log(event.target.dataset.pk)
                fetch(`api/heroes/${event.target.dataset.pk}`,{
                    method: 'DELETE',
                    credentials: 'same-origin',
                    headers:{
                        'Accept': 'application/json',
                        'X-Request-With': 'XMLHttpRequest',
                        'X-CSRFToken':csrftoken,
                        }
                })
                .then(reponse => {
                    
                    let elementToRemove = document.getElementById(event.target.dataset.pk)
                    console.log(elementToRemove)
                    heroDisplay.remove(elementToRemove)
                })
            }) 
        }
    })
}

function addHero(url){
    let heroForm = document.querySelector("#hero-form")
    console.log(heroForm)
        heroForm.addEventListener('submit', function (event){
            event.preventDefault()
            let heroFormData = new FormData(heroForm)
            console.log(heroFormData)    
            fetch(heroURL,{
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Request-With':'XMLHttpRequet',
                    'X-CSRFToken': csrftoken,
                },
                body: heroFormData
                
            })
            .then(response => {
                return response.json()
            })
            .then(newHero => {
                console.log(newHero)
                let heroItem = document.createElement('li')
                heroItem.innerText = ` ${newHero.name} |  ${newHero.alias}`
                // heroItem.classList.add('border')
                heroDisplay.appendChild(heroItem)
            })
        })        
    }

function destroyHero(url){
    fetch(url)
}

heroBuild(heroURL)   
addHero(heroURL)

