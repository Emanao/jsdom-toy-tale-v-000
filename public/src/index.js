let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    toyTaleToggle();
    makeCardsForToys();
});

function toyTaleToggle() {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", (event) => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";

            document.querySelector(".add-toy-form")
                .addEventListener("submit", function(event) {
                    addNewToyFetch(event);
                    event.preventDefault();
                });

        } else {
            toyFormContainer.style.display = "none";
        }
    });
}

function addNewToyFetch(event) {
    const toyCardCollection = document.getElementById("toy-collection");
    const dataForm = {
        name: event.target.parentElement.querySelector("input[name=name]").value,
        image: event.target.parentElement.querySelector("input[name=image]").value,
        likes: "0"
    };
    const cofigObj = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dataForm)
    }
    fetch("http://localhost:3000/toys", cofigObj)
        .then((resp) => resp.json())
        .then((newToy) => toyCardCollection.appendChild(makeAcard(newToy)));
}

function makeCardsForToys() {
    const toyCardCollection = document.getElementById("toy-collection")
    fetch("http://localhost:3000/toys")
        .then((response) => response.json())
        .then((toys) => {
            toys.forEach((toy) => toyCardCollection.appendChild(makeAcard(toy)));
        });
}

function makeAcard(toy) {
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");


    const h2ToyName = document.createElement("h2");
    h2ToyName.textContent = toy.name;
    divCard.appendChild(h2ToyName);

    const toyImg = document.createElement("img");
    toyImg.setAttribute("src", toy.image);
    toyImg.setAttribute("class", "toy-avatar")
    divCard.appendChild(toyImg);

    const pLikes = document.createElement("p");
    pLikes.textContent = toy.likes + " Likes";
    divCard.appendChild(pLikes);

    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    likeButton.setAttribute('id', toy.id)
    likeButton.textContent = "Like";
    likeButton.addEventListener('click', (event) => addLikes(event));
    divCard.appendChild(likeButton);

    return divCard;

}

function addLikes(event) {
    let pLikes = event.target.parentElement.querySelector("p");
    let likes = parseInt(pLikes.textContent.split(" ")[0]) + 1;

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "likes": likes })
        })
        .then(res => res.json())
        .then((jsonObj) => {
            pLikes.textContent = `${jsonObj.likes} Likes`;
        })
    event.preventDefault();
}