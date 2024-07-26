// Initialize the map and set the view to Philadelphia
let map = L.map('map').setView([39.9526, -75.1652], 11.5);

// Add a tile layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize an empty layer group to hold the markers
let zipcodesLayer = L.layerGroup()
let crimeincidentslayer= L.layerGroup()
let policeStationsLayer = L.layerGroup()
let schoolslayer = L.layerGroup()
let PSAlayer = L.layerGroup()

// Create a baseMaps object to hold the streetmap layer
let baseMaps = {
    "Street Map": streetmap,
};

// Create an overlayMaps object to hold all of the layers
let overlayMaps = {
    "Zip Code": zipcodesLayer,
    "Crime Incidents": crimeincidentslayer,
    "Police Stations": policeStationsLayer,
    "Schools": schoolslayer,
    "PSA" : PSAlayer
};

// Create a layer control and add it to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

// Function to create markers and add them to the policeStationsLayer
function createMarkers(response) {
    // Pull the properties from the API
    let features = response.features;

    // Initialize an array to hold markers.
    let stations = [];

    // Loop through the properties "features" array.
    for (let index = 0; index < features.length; index++) {
        let coordinates = features[index].geometry.coordinates; // Get coordinates
        let name = features[index].properties.LOCATION; // Get the name or location of the station
        let dnumber = features[index].properties.DISTRICT_NUMBER; //Get the district number
        let phone = features[index].properties.TELEPHONE_NUMBER // Get the telephone number
        
        // Create a marker per event, and bind a popup with the other properties.
        let stationsmarker = L.circle([coordinates[1], coordinates[0]], {
            color: "#ffff99", 
            fillColor: "#ffff99",
            fillOpacity: 0.75,
            radius: 100
        }).bindPopup(`<h3>Police Station: ${name},<br>District Number:${dnumber},<br>Telephone Number:${phone}</h3>`); // Interactive with the properties

        // Add the marker to the array.
        stations.push(stationsmarker);
    }

    // Add all markers to the policeStationsLayer
    L.layerGroup(stations).addTo(policeStationsLayer);
}

// Fetch the local GeoJSON data
fetch('Police_Stations.geojson')
    .then(response => response.json()) //transforms the response to a JSON 
    .then(createMarkers) //Applies our function to the result
    .catch(error => console.error('Error loading the GeoJSON data:', error)); 

// Define the SQL query to filter information
const sqlQuery = 'SELECT * FROM incidents_part1_part2 WHERE EXTRACT(YEAR FROM CAST(dispatch_date AS DATE)) = 2024  AND point_y IS NOT NULL AND point_x IS NOT NULL';
const cartoURL = `https://phl.carto.com/api/v2/sql?q=${encodeURIComponent(sqlQuery)}`;

// Fetch data from Carto
fetch(cartoURL)
    .then(response => response.json()) //transforms the call into a JSON file
    .then(data => {

        // Extract unique values of "text_general_code"
        const uniqueValues = [...new Set(data.rows.map(row => row.text_general_code))];

         // Populate dropdown menu with unique values
         const dropdown = document.getElementById('filter');
         uniqueValues.forEach(value => {
             const option = document.createElement('option');
             option.value = value;
             option.textContent = value;
             dropdown.appendChild(option);
         });

         // Filter markers based on dropdown selection
        dropdown.addEventListener('change', function() {
            const selectedCategory = this.value;
            crimeincidentslayer.clearLayers();

            data.rows.forEach(incident => {
                if (selectedCategory === "" || incident.text_general_code === selectedCategory) {
                    let crimemarkers = L.circle([incident.point_y, incident.point_x], {
                        color: "#b2182b",
                        fillColor: "#b2182b",
                        fillOpacity: 0.75,
                        radius: 0.5
                    }).bindPopup(`<b>${incident.text_general_code}</b>`);
                    
                    crimemarkers.addTo(crimeincidentslayer);
                }
            });
        });

    })
    .catch(error => console.error('Error fetching data from Carto:', error));

// Fetch the local GeoJSON data for ZIP code polygons
fetch('Zipcodes_Poly.geojson')
    .then(response => response.json())
    .then(data => { //all the info form the file is saved in the data variable
        L.geoJSON(data, { //We create all the polygons with the following properties
            style: function (feature) {
                return {
                    color: "#1a1a1a",
                    fillColor: "#e0f3f8",
                    fillOpacity: 0.7
                };
            }
        }).addTo(zipcodesLayer);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));

// Function to parse and add CSV data to the map
function addCSVMarkers(data) {
    Papa.parse(data, {
        header: true,
        complete: function(results) {
            results.data.forEach(function(row) {
                if (row.geometry) {
                    // Parse the coordinates from the POINT (longitude latitude) format
                    var coords = row.geometry.match(/POINT \(([^ ]+) ([^ ]+)\)/);
                    if (coords) {
                        var longitude = parseFloat(coords[1]);
                        var latitude = parseFloat(coords[2]);
                        // Add a marker for each coordinate
                        schoolmarkers = L.circle([latitude, longitude], {
                            color: "#053061",
                            fillColor: "#053061",
                            fillOpacity: 0.75,
                            radius: 1
                        }).bindPopup(`<b>nada</b>`);
                        schoolmarkers.addTo(schoolslayer);
                    }
                }
            });
        }
    });
}

// Fetch the CSV file and add markers to the map
fetch('new_geo_schools_df.csv')
    .then(response => response.text())
    .then(addCSVMarkers)
    .catch(error => console.error('Error loading the CSV data:', error));

// Fetch the local GeoJSON data for ZIP code polygons
fetch('Boundaries_PSA.geojson')
    .then(response => response.json())
    .then(data => { //all the info form the file is saved in the data variable
        L.geoJSON(data, { //We create all the polygons with the following properties
            style: function (feature) {
                return {
                    color: "#1a1a1a",
                    fillColor: "#fde0ef",
                    fillOpacity: 0.5
                };
            }
        }).addTo(PSAlayer);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));

// Add the layers to the map in the desired order
zipcodesLayer.addTo(map);
schoolslayer.addTo(map);
crimeincidentslayer.addTo(map);
policeStationsLayer.addTo(map);

// Define a legend control
let legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    // Create a div for the legend
    let div = L.DomUtil.create('div', 'info legend');

    // Define the categories and their corresponding colors
    const categories = [
        { name: "Police Stations", color: "#ffff99" },
        { name: "Crime Incidents", color: "#b2182b" },
        { name: "Schools", color: "#053061" },
        { name: "ZIP Codes", color: "#e0f3f8" },
        { name: "PSA Boundaries", color: "#fde0ef" }
    ];

    // Generate the legend content
    let legendHTML = '<h4>Legend</h4>';
    categories.forEach(category => {
        legendHTML += `<i style="background: ${category.color}"></i> ${category.name}<br>`;
    });

    // Set the legend content
    div.innerHTML = legendHTML;
    return div;
};

// Add the legend to the map
legend.addTo(map);
