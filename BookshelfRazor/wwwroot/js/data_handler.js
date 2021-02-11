//import { error } from "/jquery";
//import {site} from "./site.js";

export let dataHandler = {
    _data: {},
    // _api_get: function (url, callback) {
    //     fetch(url, {
    //         method: 'GET',
    //         credentials: 'same-origin',
    //     })
    //         .then(response => response.json())
    //         .then(json_response => callback(json_response));
    // },

    _api_get: async function (url) {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        const json = await response.json()
        if (!response.ok) {
            new Error('We have a problem')
        }

        return json
    },

    _api_put: async function (url) {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': "application/json; charset-UTF-8"
            }
        })

    },

    getBooks: async function (callback) {
        dataHandler._api_get(`https://localhost:5001/UserBooks`)
            .then(data => callback(data));
    },

}









