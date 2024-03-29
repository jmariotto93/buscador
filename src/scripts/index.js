import { baseUrl, repositoriesQuantity } from "./variables.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed)  getUserProfile(userName)

})

async function user(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

function getUserProfile(userName) {
    
    user(userName).then(userData => {
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="Foto do perfil do usuário" /> 
                            <div class="data">
                                    <h1>${userData.name ?? 'Não possui nome cadastrato 😒'}</h1>
                                    <p>${userData.bio ?? 'Não possui nome cadastrato 😓'}</p>
                            </div>
                        </div> `
        document.querySelector('.profile-data').innerHTML = userInfo
        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let respositoriesItens = ""
        reposData.forEach(repo => {
            respositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        });
        document.querySelector('.profile-data').innerHTML += `
       
        <div class="repositories section">
             <h2> Repositórios </h2>
             <ul>${respositoriesItens}</ul>
         </div> `
    })
}

