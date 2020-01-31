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
        iconAnchor:   [38, 38],
        popupAnchor:  [0, 0]
    }
});

var boatIcon = new MapIcon({iconUrl: 'assets/boat-icon.png'}),
    buoyIcon = new MapIcon({iconUrl: 'assets/buoy-icon.png'});

var boatCoords = [42.8490613, -70.9837522] // temporary boat coords, to be updated by socket.
L.marker(boatCoords, {icon: boatIcon}).addTo(mymap).bindPopup("boat info");
var buoyCoords = Array();
buoyCoords.push([42.851613, -70.9837522]);
buoyCoords.push([42.852613, -70.9837522]);

for (var i = 0; i < buoyCoords.length; i++) {
    L.marker(buoyCoords[i], {icon: buoyIcon}).addTo(mymap).bindPopup("buoy info");
}

var popup = L.popup();
var waypoints = Array();
var polyline = L.polyline([boatCoords]).addTo(mymap);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Marker at " + e.latlng.toString())
        .openOn(mymap);
    var currPoint = new L.marker(e.latlng).bindPopup(popup);
    waypoints.push(currPoint);
    currPoint.addTo(mymap)
    polyline.addLatLng(e.latlng);
    
    // console.log(waypoints.length)
}




// add markers to list, draw path between boat to ordered waypoints. Ability to remove markers. Remove markers once boat passes icon.
mymap.on('click', onMapClick);

// right click on map to display geographical data (wind dir/speed,)