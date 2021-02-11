import {dataHandler} from "./data_handler.js";

let mainContainer = document.querySelector("#mainContainer");

window.addEventListener('DOMContentLoaded', () => showBooks());

function showBooks() {
    clearMainContainer()
    dataHandler.getBooks(function (data) {

        let bookList = '';
        for (let item of data) {
            let publicBtn = '';
            let borrowedBtn = '';

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
        }

        mainContainer.innerHTML += bookList;
        bookList = "";
        
        const borrowedButtons = document.querySelectorAll(".borrowed");
        borrowedButtons.forEach(button => button.addEventListener('click', function () {
            const id = this.getAttribute("data-id");
            updateState(id, "borrowed");
       }));

        const isPublicButtons = document.querySelectorAll(".publicPrivate");
        isPublicButtons.forEach(button => button.addEventListener('click', function () {
            const id = this.getAttribute("data-id");
            updateState(id, "isPublic");
        }));
    });
}

function clearMainContainer() {
    mainContainer.innerHTML = "";
}

async function updateState(ubid, recordToUpdate) {
    let url = ""
    if (recordToUpdate === "borrowed") {
        url = `https://localhost:5001/UserBooks/UpdateBorrowedStatus/${ubid}`
    }else if (recordToUpdate === "isPublic") {
        url = `https://localhost:5001/UserBooks/UpdateIsPublicStatus/${ubid}`
    }
    await dataHandler._api_put(url)
    showBooks();

}

