const url = "https://striveschool-api.herokuapp.com/books";
const rowDiv = document.getElementById("rowDiv");
const cartOl = document.getElementById("cartOl");
let booksArray;
let ol = document.querySelector("ol");
let sessionBooks= JSON.parse(localStorage.getItem("book")) || [];

document.addEventListener("load", init())

function init() {
    retrieveData();
    cartFunc2();
}

async function retrieveData(){
    await fetch(url)
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
    for (let i = 0; i < booksArray.length; i++) {
        scarta[i].addEventListener("click", function () {
            booksArray.splice(i, 1);
            cards()
        });
    };
    cartFunc()
}

function cartFunc() {
    const compra = document.querySelectorAll(".compra");
    for (let i = 0; i < booksArray.length; i++) {
        compra[i].addEventListener("click", function () {
            sessionBooks.push({
                title: booksArray[i].title,
                price: booksArray[i].price
            }); 
            cartFunc2();
            localStorage.setItem("book", JSON.stringify(sessionBooks));
        });
    };
}

function cartFunc2() {
    ol.innerText = "";
    for (let i = 0; i < sessionBooks.length; i++) {
        let li = document.createElement("li");
        let btnCart = document.createElement("button");
        li.innerText = `${sessionBooks[i].title}, ${sessionBooks[i].price}€`;
        btnCart.innerHTML = "❌";
        btnCart.addEventListener("click", function () {
            sessionBooks.splice(i,1);
            localStorage.setItem("book", JSON.stringify(sessionBooks));
            cartFunc2();
        });
        li.appendChild(btnCart);
        ol.appendChild(li);
    };
}