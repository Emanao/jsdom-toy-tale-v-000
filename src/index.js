let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    toyTaleToggle();
    makeCardsForToys();
});

function toyTaleToggle() {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
            document.querySelector(".add-toy-form input[type=submit]")
                .addEventListener("click", function(event) {
                    addNewToyFetch();
                    event.preventDefault();
                });

        } else {
            toyFormContainer.style.display = "none";
        }
    });
}

function addNewToyFetch() {
    const toyCardCollection = document.getElementById("toy-collection")
    const dataForm = {
        name: document.querySelector(".add-toy-form input[name=name]").value,
        image: document.querySelector(".add-toy-form input[name=image]").value,
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
        .then((newToy) => toyCardCollection.appendChild(makeAcard(toy)));

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
    likeButton.textContent = "Like";
    divCard.appendChild(likeButton);

    return divCard;

}