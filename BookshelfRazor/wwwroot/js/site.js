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
                    publicBtn = `<button type="submit" data-id="${item.id}" 
                        class=\"publicPrivate btn btn-outline-secondary btn-sm\">Make Private</button>`

                } else {
                    publicBtn = `<button type="submit" data-id="${item.id}" 
                        class=\"publicPrivate btn btn-outline-secondary btn-sm\">Make Public</button>`
                }

                if (item.borrowed) {
                    borrowedBtn = `<button type="submit" data-id="${item.id}" 
                        class=\"borrowed btn btn-outline-secondary btn-sm\">Borrowed</button>`
                } else {
                    borrowedBtn = `<button type="submit" data-id="${item.id}" 
                        class=\"borrowed btn btn-outline-secondary btn-sm\">On my shelf</button>`
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
            const borrowedButtons = document.querySelectorAll(".borrowed");
            borrowedButtons.forEach(button => button.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                updateBorrowed(id, "borrowed");
            }));

            const isPublicButtons = document.querySelectorAll(".publicPrivate");
            isPublicButtons.forEach(button => button.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                updateBorrowed(id, "isPublic");
            }));
        });
    }
}

function updateBorrowed(ubid, recordToUpdate) {
    let link =""
     if (recordToUpdate === "borrowed"){
         link = `https://localhost:5001/UserBooks/UpdateBorrowedStatus/${ubid}`
     }else{
         link = `https://localhost:5001/UserBooks/UpdateIsPublicStatus/${ubid}`
     }
    fetch(link, {
        // mode: 'cors',
        method: "PUT",
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json; charset-UTF-8"
        }
    })
}

