import {site} from "./site.js";

export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },

    getBooks: function () {
        this._api_get(`https://localhost:5001/UserBooks`, (data) => {
            site.displayBooks(data)
        })
    },
    
    getMaxPages: function(kind){
        this._api_get(`https://api.hnpwa.com/v0`, (endpointsInfo) => {
            site.getEndpointsInfo(endpointsInfo, kind)
        })
    }
}









