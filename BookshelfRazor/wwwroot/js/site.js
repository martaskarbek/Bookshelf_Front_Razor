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
            console.log(data)
            let bookList = '';
            for (let item of data) {
                console.log(item);
                bookList += `
                
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${item.book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.book.author.firstName} ${item.book.author.lastName} </h6>
                    <p class="card-text">${item.book.genre.name}</p>
                    </div>
                </div>
            
            `;
            
                container.insertAdjacentHTML("beforeend", bookList);
                bookList = "";
                
            }
        });
    }
}

