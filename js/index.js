let idCount = 50;
const monstersArray = [];
function monsterList(){    
    fetch('http://localhost:3000/monsters')
    .then(res=>res.json())
    .then(data=>data.forEach(m=>{
        if(m.id <= idCount){
        monsterRender(m)
        }
    }))
}



function monsterRender(monster){
    const name = document.createElement('h2');
    const age = document.createElement('h4');
    const desc = document.createElement('p');
    //const space = document.createElement('p')

    name.textContent = monster.name
    name.style.fontWeight = 'bold'
    name.style.fontSize = '24px'
    age.textContent = `Age: ${monster.age}`
    desc.textContent = `Bio: ${monster.description}`

    document.getElementById('monster-container').append(name)
        //document.getElementById('monster-container').appendChild(space)
    document.getElementById('monster-container').append(age)
        //document.getElementById('monster-container').appendChild(space)
    document.getElementById('monster-container').append(desc)
        //document.getElementById('monster-container').appendChild(space)
    

}

function newMonster(){
    const form = document.createElement('form')
    form.innerHTML = `
        <input id='name' placeholder='name...'></input>
        <input id='age' placeholder='age...'></input>
        <input id='description' placeholder='description'></input>
        <button id='newMonster'>Create</button>
    `
    document.querySelector('#create-monster').appendChild(form)
    //form.addEventListener('submit', )
    const btn = document.querySelector('#newMonster')
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                "name": document.querySelector("#name").value,
                "age": document.querySelector("#age").value,
                "description": document.querySelector("#description").value
            })
        })
        .then(res=>res.json())
        .then(data=>data)
    })
}

document.addEventListener('DOMContentLoaded', newMonster)
document.addEventListener('DOMContentLoaded', ()=>{
    monsterList()
    document.querySelector('#forward').addEventListener('click', ()=>{
    idCount+=50
    monsterList()})

})
document.addEventListener('DOMContentLoaded', ()=>{
    //monsterList()
    document.querySelector('#back').addEventListener('click', ()=>{
        idCount-=50
        if(idCount>=50){
        const monsterCont = document.querySelector('#monster-container')  
        while (monsterCont.firstChild) {
            monsterCont.removeChild(monsterCont.firstChild);
        }  
        monsterList()}
    })
})

/*function idList(){
    const ids =  fetch('http://localhost:3000/monsters')
    .then(res=>res.json())
    .then(data=>data.forEach(m=>console.log(m.id)))

    
}*/