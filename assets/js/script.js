const url = "https://striveschool-api.herokuapp.com/books";
const rowDiv = document.getElementById("rowDiv");
const cartOl = document.getElementById("cartOl");
let booksArray;

const retrieveData = () => {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            booksArray = data;
            cards();
            console.log(booksArray);
        })
        .catch((error) => {
            console.log(error);
        })
}

retrieveData();

function cards() {
    rowDiv.innerHTML = ""
    for (let i = 0; i < booksArray.length; i++) {
        rowDiv.innerHTML +=
            `<div class="card col-3">
         <img src="${booksArray[i].img}" class="card-img-top">
         <div class="card-body">
         <h5 class="card-title">${booksArray[i].title}</h5>
         <p class="card-text">${booksArray[i].category}</p>
         <p class="card-text">${booksArray[i].price}€</p>
         <a href="javascript:void(0)" class="btn btn-primary compra">COMPRA</a>
         <a href="javascript:void(0)" class="btn btn-primary scarta">SCARTA</a>
         </div>
         </div>`;
         
    };
    const scarta = document.querySelectorAll(".scarta");
    for (let i=0; i< booksArray.length; i++){
         scarta[i].addEventListener("click", function(){
            booksArray.splice(i, 1);
            cards()
         });
    };
    cartfunc()
}

function cartfunc() {
    const compra = document.querySelectorAll(".compra");
    for (let i=0; i< booksArray.length; i++){
        compra[i].addEventListener("click", function(){
            const li = document.createElement("li");
            li.innerHTML = `${booksArray[i].title} ${booksArray[i].price}€`;
            cartOl.appendChild(li);
            const cartBtn = document.createElement("button");
            cartBtn.innerHTML= "ciao";
            li.appendChild(cartBtn);
            cartBtn.addEventListener("click", function(){
                li.style.display = "none";
            });
        })
    }
}