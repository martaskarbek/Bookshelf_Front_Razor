import {dataHandler} from "./data_handler.js";

let container = document.querySelector("#mainContainer");

/*window.addEventListener('DOMContentLoaded', () => main.init());*/


(() => {
    showBooks();
})();

function showBooks()
{
    container.innerHTML = "";
    dataHandler.getBooks(function (data) {
        console.log(container);
        let bookList = '';
        for (let item of data) {
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

            container.innerHTML += bookList;
            bookList = "";
        }
        const borrowedButtons = document.querySelectorAll(".borrowed");
        borrowedButtons.forEach(button => button.addEventListener('click', function () {
            const id = this.getAttribute("data-id");
            updateBorrowed(id, "borrowed");
            setTimeout(showBooks(), 500);
        }));

        const isPublicButtons = document.querySelectorAll(".publicPrivate");
        isPublicButtons.forEach(button => button.addEventListener('click', function () {
            const id = this.getAttribute("data-id");
            updateBorrowed(id, "isPublic");
            setTimeout(showBooks(), 500);
        }));
    });
} 
/*

let main = {
    /!*init: function () {
        this.showBooks()
    },*!/

    showBooks: function () {
        container.innerHTML = "";
        dataHandler.getBooks(function (data) {
            console.log(container);
            let bookList = '';
            for (let item of data) {
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
                
                container.innerHTML += bookList;
                console.log("it did adjacent");
                bookList = "";
            }
            const borrowedButtons = document.querySelectorAll(".borrowed");
            borrowedButtons.forEach(button => button.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                updateBorrowed(id, "borrowed");
                this.showBooks();
            }));

            const isPublicButtons = document.querySelectorAll(".publicPrivate");
            isPublicButtons.forEach(button => button.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                updateBorrowed(id, "isPublic");
                this.showBooks();
            }));
        });
    }
}
*/

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

