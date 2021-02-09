// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import {dataHandler} from "./data_handler.js";

let container = document.querySelector("#mainContainer");

window.addEventListener('DOMContentLoaded', () => main.init());


 let main = {

    init: function () {
        // This function should run once, when the page is loaded.
        this.showBooks()
    },

    //loadBooks: function (data) {
            
      
    //},

    showBooks: function () {

        dataHandler.getBooks(function (data) {
         /*   console.log("dupa")
            console.log(data)
            console.log("dupa2")*/
            let bookList = '';
            for (let item of data) {
         /*       console.log(item);*/
                let publicBtn = '';
                let borrowedBtn= '';

                if (item.isPublic) {
                    publicBtn = `<button type="submit" data-id="${item.id}" class=\"borrowed btn btn-outline-secondary btn-sm\">Make Private</button>`
                    //publicBtn = `<a href=\"#\" data-id="${ item.id }" class=\"borrowed btn btn-outline-secondary btn-sm\">Make Private</a>`

                } else {
                    publicBtn = `<button type="submit" data-id="${item.id}" class=\"borrowed btn btn-outline-secondary btn-sm\">Make Public</button>`
                    //publicBtn = `<a href=\"#\" data-id="${ item.id }" class=\"borrowed btn btn-outline-secondary btn-sm\">Make Public</a>`
                }

                if (item.borrowed) {
                    borrowedBtn = `<button type="submit" data-id="${item.id}" class=\"borrowed btn btn-outline-secondary btn-sm\">Returned</button>`
                   // borrowedBtn = `<a href=\"#\" data-id="${item.id}" class=\"btn btn-outline-secondary btn-sm\">Returned</a>`
                } else {
                    borrowedBtn = `<button type="submit" data-id="${item.id}" class=\"borrowed btn btn-outline-secondary btn-sm\">Borrowed</button>`
                    //borrowedBtn = `<a href=\"#\" data-id="${item.id}" class=\"btn btn-outline-secondary btn-sm\">Borrowed</a>`
                }
                
                
                bookList += `
                 <div class="col-sm-3">
                <div class="card mb-3" ">
                    <div class="card-body">
                    <h5 class="card-title">${item.book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.book.author.firstName} ${item.book.author.lastName} </h6>
                    <p class="card-text">${item.book.genre.name}</p>
                    ${publicBtn}
                    ${borrowedBtn}
                    </div>
                </div>
                </div>    
            `;
            
                container.insertAdjacentHTML("beforeend", bookList);
                bookList = "";
            }
            const buttons = document.querySelectorAll(".borrowed");
            buttons.forEach(button => button.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                //updateBorrowed(id);
            }));
        });


    }
}


function updateBorrowed(ubid) {
    fetch(`https://localhost:5001/UserBooks/?id=${ubid}`, {
        // mode: 'cors',
        method: "PUT",
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json; charset-UTF-8"
        }
    })
}

const dupa = document.querySelector("#dupa");
dupa.addEventListener('click', ()=> (console.log("dupa dupa")));
dupa.addEventListener('click', updateBorrowed("def9c864-7423-49f6-8ff6-5b96096c7341"));
