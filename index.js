const selectBreed = document.querySelector('#selectBreed')

document.addEventListener('DOMContentLoaded', () => {

    fetch('https://api.thecatapi.com/v1/breeds')
   .then(res => {
    if (!res.ok) {
        throw new err('Network respose was not ok. Please try again!')
    }
    return res.json()
   })
   .then(catArray => {
    catObjects = catArray
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Please select";
    selectBreed.appendChild(defaultOption);

    catArray.forEach(catObject => {
        const catOPtion = document.createElement("option")
        catOPtion.value = catObject.id
        catOPtion.innerText = catObject.name

        selectBreed.append(catOPtion)
    }) 
   })
   .catch(err => console.log('Error fetching cat breeds. Please try again!',err))
})


selectBreed.addEventListener("change", (e) => {
    e.preventDefault()

    const found = catObjects.find(catObj => e.target.value === catObj.id)
    console.log(found)

    const card = document.createElement("div")
    card.className = 'card'
    card.innerHTML = `
        <h3 id="cat-breed">${found.name}</h3>
        <div class="card-img">
            <img src = https://cdn2.thecatapi.com/images/${found.reference_image_id}.jpg>
        </div>
        <div class="cat-descriptions">
            <p id="description"><b>Description:</b> <br/> ${found.description} </p>
            <p id="temperament"><b>Temperament:</b> <br/> ${found.temperament} </p>
            <p id="origin"><b>Origin:</b> <br/> ${found.origin} </p>
        </div>
    `
    const cardCollection = document.getElementById("breed-collection")
    cardCollection.append(card)
    
    const deleteBtn = document.createElement("button")
    deleteBtn.addEventListener('click', () => {
        card.remove()
    })

    deleteBtn.innerText = 'Delete'
    card.append(deleteBtn)
})


