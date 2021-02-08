// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import {dataHandler} from "./data_handler.js";

let container = document.querySelector("#mainContainer");

window.addEventListener('DOMContentLoaded', () => site.init());


export let site = {

    init: function () {
        // This function should run once, when the page is loaded.
        this.loadBooks()
    },

    loadBooks: function () {
        let
            data = dataHandler.getBooks();
        this.showBooks(data);

    },

    showBooks: function (data) {
        console.log(data)

        let showList = '';
        for (let book of data) {

            showList += `
                
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                    <p class="card-text">${book.genre}</p>
                    </div>
                </div>

            `;
            
            container.insertAdjacentHTML("beforeend", outerHtml);
            
        }
    }
}

