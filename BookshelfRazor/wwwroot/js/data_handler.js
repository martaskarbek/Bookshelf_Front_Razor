//import { error } from "/jquery";
//import {site} from "./site.js";

export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },

    _api_two: async function (url) {
        const response = await fetch(url, {
            method: 'GET',
         
           // mode : 'no-cors',
            credentials: 'same-origin'
        })
        const json = await response.json()
        if (!response.ok) {
            new Error('We have a problem')
        }

        return json
    },
    //getBooks: function () {
    //    this._api_get(`https://localhost:5001/UserBooks`, (data) => {
    //        site.showBooks(data)
    //    })
    //},
    getBooks: function (callback) {
        this._api_two(`https://localhost:5001/UserBooks`)
            .then(data => callback(data));
    },
    
    //getMaxPages: function(kind){
    //    this._api_get(`https://api.hnpwa.com/v0`, (endpointsInfo) => {
    //        site.getEndpointsInfo(endpointsInfo, kind)
    //    })
    //}
}









