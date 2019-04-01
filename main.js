let map
let markers = []

const initializeMap = () => {
    map = L.map('map').setView([-22.9399, -43.1776], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYXJsaW5kbyIsImEiOiJjaWljZDgwemYwMGFydWJrc2FlNW05ZjczIn0.rOROEuNNxKWUIcj6Uh4Xzg'
    }).addTo(map);
}

const fetchData = () => {
    fetch('db.json').then(response => response.json().then(data => {
        places = data
        createMapPins()
    }))
}

const createMapPins = () => {
    places.forEach(place => {
        let marker = L
            .marker(place.coords)
            .bindPopup(`<h2>${place.name}</h2><p>${place.description}</p>`)
            .addTo(map);
        markers.push(marker);
    })
}

const init = () => {
    initializeMap()
    fetchData()
}

init()
