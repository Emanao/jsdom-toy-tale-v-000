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
        } else {
            toyFormContainer.style.display = "none";
        }
    });
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
    console.log(toy);
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
    // <p>4 Likes </p>
    // <button class="like-btn">Like <3</button>

}