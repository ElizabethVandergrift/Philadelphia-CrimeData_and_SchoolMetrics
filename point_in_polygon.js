// Initialize the map
var map = L.map('map').setView([40.052724593837198, -75.008288806677399], 13);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the GeoJSON polygon
var geojsonPolygon = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-75.008288806677399, 40.052724593837198],
                [-75.007888777577605, 40.052390318161898],
                [-75.006161033850304, 40.053722286591501],
                // More coordinates...
                [-75.008288806677399, 40.052724593837198]
            ]
        ]
    }
};

// Add the polygon to the map
var polygonLayer = L.geoJSON(geojsonPolygon).addTo(map);

// Define the point you want to check
var point = [40.053, -75.006]; // Replace with your coordinates

// Use leaflet-pip to check if the point is inside the polygon
var results = leafletPip.pointInLayer(point, polygonLayer);

if (results.length > 0) {
    console.log("The point is inside the polygon.");
} else {
    console.log("The point is outside the polygon.");
}

// Optional: Add the point to the map for visualization
L.marker(point).addTo(map).bindPopup("Point").openPopup();