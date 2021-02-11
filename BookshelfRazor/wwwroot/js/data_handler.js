//import { error } from "/jquery";
//import {site} from "./site.js";

export let dataHandler = {
    _data: {},
    _api_get: function (url, callback) {
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },

    _api_two: async function (url) {
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









