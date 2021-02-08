import {dataHandler} from "./data_handler.js";
// import * as youTube from '/modules/my-module.js'

const showsOnPage = 15
const maxShowsCount = 100

export let dom = {

    init: function () {
        // This function should run once, when the page is loaded.
        this.loadShows()


    },
    loadShows: function (offset = 0, order = 'rating', direction = 'DESC') {
        // retrieves shows
        dataHandler.getMostRatedShows(offset, order, direction)
        dom.showPagination(showsOnPage, maxShowsCount, offset, order, direction)
        const actorsBtn = document.querySelector('#bt_actors')
        actorsBtn.addEventListener('click', () => this.loadActors())
        const episodeBtn = document.querySelector('#bt_episode')
        episodeBtn.addEventListener('click', () => dataHandler.getEpisode(2247122))
    },

    showShows: function (shows, offset, order, direction, indicator = '↓↑') {

        offset = parseInt(offset) - showsOnPage
        let showList = '';
        for (let show of shows) {

            showList += `
                
                    <tr>
                        <td><a class="table-title" id="${show.id}">${show.title}</a></td>
                        <td>${show.year}</td>
                        <td>${show.runtime}</td>
                        <td>${show.genres_list}</td>
                        <td>${show.rating}</td>
                        <td>${show.trailer !== null ? `<a href=${show.trailer}>${show.trailer}</a>` : `No URL`}</td>
                        <td>${show.homepage !== null ? `<a href=${show.homepage}>${show.homepage}</a>` : `No URL`}</td>
                        <td class="action-column">
                            <button type="button" class="icon-button"><i class="fa fa-edit fa-fw"></i></button>
                            <button type="button" class="icon-button"><i class="fa fa-trash fa-fw"></i></button>
                        </td>
                    </tr>
                
            `;

        }

        const outerHtml = `
                <thead>
                <tr> 
                    <th id="table-header-title">Title ${indicator}</th>
                    <th id="year">Release year ${indicator}</th>
                    <th id="runtime">Runtime ${indicator}</th>
                    <th id="genres">Genres</th>
                    <th id="rating">Rating ${indicator}</th>
                    <th>Trailer</th>
                    <th>Homepage</th>
                    <th class="action-column">action</th>
                </tr>
                </thead>
                <tbody>
                ${showList}
                </tbody>
        `;

        let showsContainer = document.querySelector('#shows-container');
        showsContainer.insertAdjacentHTML("beforeend", outerHtml);

        let title = document.querySelector('#table-header-title')
        let year = document.querySelector('#year')
        let runtime = document.querySelector('#runtime')
        let rating = document.querySelector('#rating')

        title.addEventListener('click', () => {
            let order = 'title'
            dom.direction_switch(offset, order, direction)
        })
        year.addEventListener('click', () => {
            let order = 'year'
            dom.direction_switch(offset, order, direction)
        })
        runtime.addEventListener('click', () => {
            let order = 'runtime'
            dom.direction_switch(offset, order, direction)
        })
        rating.addEventListener('click', () => {
            let order = 'rating'
            dom.direction_switch(offset, order, direction)
        })

        let showTitles = document.querySelectorAll(".table-title")
        for (let showTitle of showTitles) {
            showTitle.addEventListener('click', () => {
                dataHandler.getShow(showTitle.id)
            })
        }

    },

    showShow: function (show) {
        // Injects received data into HTML structure and removes shows table
        document.title = show.title
        dom.changeHeader('Show details')
        dom.removeModal()
        dom.clearPage()
        dom.loadShowDetailsTemplate()
        dom.loadVideo(show)
        dom.updateBreadcrumbs(show)
        let showTitle = document.querySelector("#show-title")
        showTitle.innerHTML = show.title
        let showInfo = document.querySelector("#show-runtime-genre-year")
        showInfo.innerHTML = `${Math.floor(show.runtime / 60) === 0 ? '' : String(Math.floor(show.runtime / 60)) + 'h'} ${show.runtime % 60}min  
                <span class="separator">|</span>${show.genres_list} <span
                            class="separator">|</span> ${show.date}`
        let showOverview = document.querySelector("#overview")
        showOverview.innerHTML = show.overview
        let showRating = document.querySelector("#show-rating")
        showRating.innerHTML = `${show.rating} ☆`
        let showStars = document.querySelector("#show-stars")
        const actors = (show.actors_list2).split(",")
        let actorsList = '';
        for (let actor of actors) {
            actorsList += `<a href="#" >${actor}</a>`
        }
        let outerHTML = `
            <b>Stars: </b>${actorsList}
            `
        showStars.innerHTML = outerHTML

        dom.loadSeasons(show.id)

    },

    loadSeasons: function (show_id) {
        dataHandler.getSeasonsByShow(show_id)
    },

    changeHeader: function (text) {
        let header = document.querySelector('#page-header')
        header.innerText = text
    },

    showEpisode: function (episode) {
        dom.changeHeader('Episode details')
        dom.removeModal()
        this.clearPage()
        const container = this.createCard('episode-details')
        const episodeData = `
            <div><h3>${episode.title}</h3></div><div><p>${episode.overview}</p></div>
            <button id="show-episode-actors">Show actors</button>
        `
        container.insertAdjacentHTML('beforeend', episodeData)
        this.insertIntoPage(container)

        const showActorsBtn = document.querySelector('#show-episode-actors')
        showActorsBtn.addEventListener('click', () => dataHandler.getEpisodeActors(2247122))

    },

    showEpisodeActors: function (actors) {

        const container = this.createCard('episode-actors')
        let actorsList = ''

        for (let actor of actors) {
            actorsList += `
            <tr>
                <td>${actor.character_name}</td><td class="actor-name" data-actor_id="${actor.id}" ><a href="#">${actor.name}</a></td>
            </tr>
            `
        }
        ;

        const outerHtml = `
            <table>
                <thead>
                <tr> 
                    <th id="table-character">Character Name</th>
                    <th id="table-actor">Actor</th>
                </tr>
                </thead>
                <tbody>
                ${actorsList}
                </tbody>
           </table>
        `

        container.insertAdjacentHTML('beforeend', outerHtml)
        this.insertIntoPage(container)

        const actorsNames = document.querySelectorAll('.actor-name')
        for (let actorName of actorsNames) {
            actorName.addEventListener('click', () => dataHandler.getActor(actorName.dataset.actor_id))
        }

    },

    showActor(actor) {
        console.log(actor)
        dom.changeHeader('Actor details')
        dom.removeModal()
        this.clearPage()
        const container = this.createCard('actor-details')
        const content = `<div><h3>${actor.name}</h3></div>
                <p class="small grayed">${actor.birthday} ${actor.death === null ? '' : ' – '+actor.death}</p>
                <div><p>${actor.biography === null ? 'No biography yet': actor.biography}</p></div>
        `
        container.insertAdjacentHTML('beforeend', content)
        this.insertIntoPage(container)

    },

    insertIntoPage: function (element) {
        const contentContainer = document.querySelector('#content')
        contentContainer.appendChild(element)
    },

    showSeasons: function (seasons) {
        let seasonsList = ''

        for (let season of seasons) {

            seasonsList += `
            <tr>
                <td>${season.season_number}</td>
                <td>${season.title}</td>
                <td>${season.overview}</td>
            </tr>
            
            `
        }
        const outerHtml = `
            <table>
                <thead>
                <tr> 
                    <th id="table-season-number"></th>
                    <th id="table-season-title">Title</th>
                    <th id="table-season-title">Overview</th>
                </tr>
                </thead>
                <tbody>
                ${seasonsList}
                </tbody>
           </table>
        `;

        let seasonsContainer = document.querySelector('#seasons-list')
        seasonsContainer.insertAdjacentHTML("beforeend", outerHtml);


    },

    loadVideo: function (show) {
        let videoId = (show.trailer).split('v=')[1]
        let YTplayer = document.querySelector('#player')
        const newTrailerUrl = `https://www.youtube.com/embed/${videoId}`
        let iframe = `<iframe class="poster col col-third" width="560" height="315" src="${newTrailerUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        YTplayer.innerHTML = iframe
    },

    loadActors: function () {
        dataHandler.getActors()
    },

    showActors: function (actors) {
        // Constructs actors list, injects it into card element and place on page

        dom.changeHeader('Actors list')
        dom.clearPage()
        let actorsList = ''
        for (let actor of actors) {
            actorsList += `
            <tr>
                <td id="${actor.id}"><a href="#">${actor.name}</a></td>
            </tr>`
        }

        const outerHtml = `
            <table>
                <thead>
                <tr> 
                    <th id="table-actor-name">Name</th>
                </tr>
                </thead>
                <tbody>
                ${actorsList}
                </tbody>
           </table>
        `;

        const card = this.createCard('actors')
        card.insertAdjacentHTML("beforeend", outerHtml);
        const container = document.querySelector('#content')
        container.appendChild(card)
        const cells = document.querySelectorAll('td')
        for (let cell of cells) {
            cell.addEventListener('click', () => dataHandler.getActorsShows(cell.id))
        }

    },

    showActorShows: function (actorShows) {
        let modalElement = document.querySelector('#modal');
        let showsList = ''
        for (let show of actorShows) {
            showsList += `<a href="#" id="${show.id}">${show.title}, </a> `
        }
        modalElement.insertAdjacentHTML("beforeend", `${showsList}`);
        modalElement.classList.toggle("show")
        const body = document.querySelector('#body-wrapper')
        body.classList.add("click-prevent")
        let modalContent = modalElement.querySelectorAll('a')
        for (let record of modalContent) {
            record.addEventListener('click', () => dataHandler.getShow(record.id))
        }
        dom.resetModal()
    },

    resetModal: function () {
        // Removes modal content, hides it and enables clicking
        let modalElement = document.querySelector('#modal');
        const deleteBtn = document.querySelector('#close-modal')
        deleteBtn.addEventListener('click', () => {
            let modalContent = modalElement.querySelectorAll('a')
            for (let show of modalContent) {
                show.remove()
            }
            modalElement.classList.remove("show")
            const body = document.querySelector('#body-wrapper')
            body.classList.remove("click-prevent")
        })
    },

    removeModal: function () {
        let modalElement = document.querySelector('#modal');
        modalElement.classList.remove("show")
        const body = document.querySelector('#body-wrapper')
        body.classList.remove("click-prevent")
    },


    clearPage: function () {
        const cards = document.querySelectorAll('.card')
        for (let card of cards) card.remove()

    },

    createCard: function (id) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('id', id)
        return card
    },

    updateBreadcrumbs: function (show) {
        let breadcrumb = document.querySelector('.breadcrumb')
        const title = `<span class="separator">></span>${show.title}`
        breadcrumb.innerHTML += title
    },

    clearTable: function () {
        let showsContainer = document.querySelector('#shows-container');
        showsContainer.innerHTML = ''

    },

    direction_switch: function (offset, order, direction) {
        dom.clearTable()
        direction == 'ASC' ? direction = 'DESC' : direction = 'ASC'
        dataHandler.getMostRatedShows(offset, order, direction)
    },

    showPagination: function (showsOnPage, maxShowsCount, offset, order, direction) {
        const numberOfPages = Math.ceil(maxShowsCount / showsOnPage)
        let pageList = ''
        let i
        for (i = 1; i <= numberOfPages; i++) {
            offset = (i - 1) * showsOnPage
            pageList += `<a class="page-number" id="${offset}">${i} </a>`
        }

        let pages = document.querySelector('.pagination')
        pages.insertAdjacentHTML("beforeend", pageList);

        let pageNumbers = document.querySelectorAll('.page-number')
        for (let pageNumber of pageNumbers) {
            pageNumber.addEventListener('click', () => dom.showAnotherPage(pageNumber.id, order, direction))
        }
    },

    showAnotherPage: function (offset, order, direction) {
        dom.clearTable()
        dataHandler.getMostRatedShows(offset, order, direction)
    },

    renderShowDetailsPage: function (show) {
        dataHandler.renderShowDetailsPage(show)

    },


    loadShowDetailsTemplate: async function () {
        let contentContainer = document.querySelector('#content');
        let detailedViewTemp = document.querySelector('#detailed-view');
        let detailedView = detailedViewTemp.content.cloneNode(true)
        contentContainer.appendChild(detailedView)
    },

}