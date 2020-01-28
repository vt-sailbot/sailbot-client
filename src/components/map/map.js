var lakeCoords = [42.8490613, -70.9837522]

var mymap = L.map('mapid').setView(lakeCoords, 15);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZXZhbnExMjYiLCJhIjoiY2s1eHRjZWYzMDNkbTNvbGt4Y3Z1dG92cyJ9.3A4MlGPWkaZCA80NyPGung'
}).addTo(mymap);

var MapIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 38],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

var boatIcon = new MapIcon({iconUrl: 'assets/boat-icon.png'}),
    bouyIcon = new MapIcon({iconUrl: 'assets/bouy-icon.png'});

var boatCoords = [42.85, -70.98] // temporary boat coords, to be updated by socket.
L.marker([42.85, -70.98], {icon: boatIcon}).addTo(mymap).bindPopup("Display boat information here:");

var bouyCoords = [[40.85, -70.90], [41.85, -69.90]]

for (var i = 0; i < bouyCoords.length; i++) {
    L.marker(bouyCoords[i], {icon: bouyIcon}).addTo(mymap).binPopup("Display bouy information here:");
}

var popup = L.popup();

var waypoints = new Array();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Setting marker at " + e.latlng.toString())
        .openOn(mymap);
    newPoint = L.marker(e.latlng);
    newPoint.addTo(mymap);
    waypoints.push(newPoint);
}
// add markers to list, draw path between boat to ordered waypoints. Ability to remove markers. Remove markers once boat passes icon.

mymap.on('click', onMapClick);

// right click on map to display geographical data (wind dir/speed,)