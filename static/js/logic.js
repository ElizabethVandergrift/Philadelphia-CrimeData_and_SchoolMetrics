// Initialize the map and set the view to Philadelphia
let map = L.map('map').setView([39.9526, -75.1652], 11.5);

// Add a tile layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize an empty layer group to hold the markers
let zipcodesLayer = L.layerGroup();
let crimeIncidentsLayer = L.layerGroup();
let policeStationsLayer = L.layerGroup();
let schoolsLayer = L.layerGroup();
let PSALayer = L.layerGroup();

// Create a baseMaps object to hold the streetmap layer
let baseMaps = {
    "Street Map": streetmap,
};

// Create an overlayMaps object to hold all of the layers
let overlayMaps = {
    "Zip Code": zipcodesLayer,
    "Crime Incidents": crimeIncidentsLayer,
    "Police Stations": policeStationsLayer,
    "Schools": schoolsLayer,
    "PSA": PSALayer
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
        let dnumber = features[index].properties.DISTRICT_NUMBER; // Get the district number
        let phone = features[index].properties.TELEPHONE_NUMBER; // Get the telephone number
        
        // Create a marker per event, and bind a popup with the other properties.
        let stationsMarker = L.circle([coordinates[1], coordinates[0]], {
            color: "#ffff99", 
            fillColor: "#ffff99",
            fillOpacity: 0.75,
            radius: 100
        }).bindPopup(`<h3>Police Station:</h3> <p>${name}</p><h3>District Number:</h3> <p>${dnumber}</p><h3>Telephone Number: </h3><p>${phone}</p>`); // Interactive with the properties

        // Add the marker to the array.
        stations.push(stationsMarker);
    }

    // Add all markers to the policeStationsLayer
    L.layerGroup(stations).addTo(policeStationsLayer);
}

// Fetch the local GeoJSON data
fetch('data/Police_Stations.geojson')
    .then(response => response.json()) // Transforms the response to a JSON 
    .then(createMarkers) // Applies our function to the result
    .catch(error => console.error('Error loading the GeoJSON data:', error)); 

// Define the SQL query to filter information
const sqlQuery = 'SELECT * FROM incidents_part1_part2 WHERE EXTRACT(YEAR FROM CAST(dispatch_date AS DATE)) = 2024 AND point_y IS NOT NULL AND point_x IS NOT NULL';
const cartoURL = `https://phl.carto.com/api/v2/sql?q=${encodeURIComponent(sqlQuery)}`;

// Fetch data from Carto
fetch(cartoURL)
    .then(response => response.json()) // Transforms the call into a JSON file
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
            crimeIncidentsLayer.clearLayers();

            data.rows.forEach(incident => {
                if (selectedCategory === "" || incident.text_general_code === selectedCategory) {
                    let crimeMarkers = L.circle([incident.point_y, incident.point_x], {
                        color: "#b2182b",
                        fillColor: "#b2182b",
                        fillOpacity: 0.75,
                        radius: 0.5
                    }).bindPopup(`<b>${incident.dispatch_date_time}</b>`);
                    
                    crimeMarkers.addTo(crimeIncidentsLayer);
                }
            });
        });

    })
    .catch(error => console.error('Error fetching data from Carto:', error));

// Fetch the local GeoJSON data for ZIP code polygons
fetch('data/Zipcodes_Poly.geojson')
    .then(response => response.json())
    .then(data => { // All the info from the file is saved in the data variable
        L.geoJSON(data, { // We create all the polygons with the following properties
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
                        let schoolMarkers = L.circle([latitude, longitude], {
                            color: "#053061",
                            fillColor: "#053061",
                            fillOpacity: 0.75,
                            radius: 1
                        }).bindPopup(`<h3>School ID</h3> <p>${row.school_id}</p><h3>School name</h3> <p>${row.SCHOOL_NAME}</p><h3>Grade Level</h3> <p>${row.GRADE_LEVEL}</p>`);
                        schoolMarkers.addTo(schoolsLayer);
                    }
                }
            });
        }
    });
}

// Fetch the CSV file and add markers to the map
fetch('data/new_geo_schools_df.csv')
    .then(response => response.text())
    .then(addCSVMarkers)
    .catch(error => console.error('Error loading the CSV data:', error));

// Fetch the local GeoJSON data for PSA boundaries
fetch('data/Boundaries_PSA.geojson')
    .then(response => response.json())
    .then(data => { // All the info from the file is saved in the data variable
        L.geoJSON(data, { // We create all the polygons with the following properties
            style: function (feature) {
                return {
                    color: "#1a1a1a",
                    fillColor: "#fde0ef",
                    fillOpacity: 0.5
                };
            }
        }).addTo(PSALayer);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));

// Add the layers to the map in the desired order
zipcodesLayer.addTo(map);
schoolsLayer.addTo(map);
crimeIncidentsLayer.addTo(map);
policeStationsLayer.addTo(map);
PSALayer.addTo(map);

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

// Plot for Crime Trends Over Time by Category
d3.csv("data/crime_group_by_date.csv").then(function(data) {
    let traces = [];
    let categories = new Set(data.map(d => d.Crime_Group));
    categories.forEach(category => {
        let filteredData = data.filter(d => d.Crime_Group === category);
        let trace = {
            type: "scatter",
            mode: "lines+markers",
            name: category,
            x: filteredData.map(d => d.Dispatch_Date),
            y: filteredData.map(d => +d.Frequency),
            line: { shape: 'spline' }
        };
        traces.push(trace);
    });

    var layout = {
        title: 'Crime Trends Over Time by Category',
        width:1300,
        xaxis: {
            autorange: true,
            type: 'date',
            title: 'Date',
            rangeselector: {
                buttons: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    { step: 'all' }
                ]
            },
            rangeslider: { range: ['2024-01-01', '2024-7-31'] },
            tickformat: '%b %Y'
        },
        yaxis: {autorange: true, type: 'linear', title: 'Frequency of Crimes'}
    };

    Plotly.newPlot('crimeTrendsDiv', traces, layout);
});

// Plot for High School Metrics
d3.csv("data/Total_Crimes_HS_PSA.csv").then(function(data) {
    let xData = data.map(d => +d.Total_Crimes);
    let yDataAttendance = data.map(d => +d.Average_Percent_Attending_90);
    let yDataProficiency = data.map(d => +d.Average_Percent_Proficient_All_Keystones);
    
    var data = [
        {x: xData, y: yDataAttendance, mode: 'markers', type: 'scatter', name: 'Attendance vs. Crimes', marker: { size: 12 }},
        {x: xData, y: yDataProficiency, mode: 'markers', type: 'scatter', name: 'Proficiency vs. Crimes', marker: { size: 12 }}
    ];

    var layout = {
        title: 'PSA Crime Impact on High School Metrics',
        width: 1300,
        xaxis: {title: 'Total Crimes in PSA'},
        yaxis: {title: 'School Metrics Percentage'}
    };

    Plotly.newPlot('hsMetricsDiv', data, layout);
});

// Plot for Elementary School Metrics
d3.csv("data/Total_Crimes_ES_PSA.csv").then(function(data) {
    let xData = data.map(d => +d.Total_Crimes);
    let yData = [
        {data: data.map(d => +d.Average_Percent_Attending_90), name: 'Attendance' },
        {data: data.map(d => +d.Average_ELA_Proficiency_3_to_8), name: 'ELA Proficiency' },
        {data: data.map(d => +d.Average_Math_Proficiency_3_to_8), name: 'Math Proficiency'}
    ];

    var traces = yData.map(metric => ({
        x: xData,
        y: metric.data,
        mode: 'markers',
        type: 'scatter',
        name: `${metric.name} vs. Crimes`,
        marker: {size:12}
    }));

    var layout = {
        title: 'PSA Crime Impact on Elementary School Metrics',
        width: 1300,
        xaxis: {title: 'Total Crimes in PSA'},
        yaxis: {title: 'School Metrics Percentage'}
    };

    Plotly.newPlot('esMetricsDiv', traces, layout);
});

// Plot for Total Crimes and School Scores by PSA
d3.csv("data/Total_Crimes_ES_PSA.csv").then(function(data) {
    let psaNumbers = data.map(row => String(row.District_PSA)); // Convert to string
    let totalCrimes = data.map(row => +row.Total_Crimes);
    let attendanceRates = data.map(row => +row.Average_Percent_Attending_90);
    let elaProficiency = data.map(row => +row.Average_ELA_Proficiency_3_to_8);
    let mathProficiency = data.map(row => +row.Average_Math_Proficiency_3_to_8);

    let trace2 = {
        x: psaNumbers,
        y: totalCrimes,
        name: 'Total Crimes',
        type: 'bar',
        marker: { color: 'rgb(49,130,189)' },
        text: psaNumbers.map(num => `PSA: ${num}`), // Adding PSA numbers to tooltips
        hoverinfo: 'text+y',
        yaxis: 'y2'
    };

    let trace1 = {
        x: psaNumbers,
        y: attendanceRates,
        name: 'Attendance Rate',
        type: 'bar',
        marker: { color: 'rgb(204,204,204)' },
        text: psaNumbers.map(num => `PSA: ${num}`),
        hoverinfo: 'text+y',
        yaxis: 'y1'
    };

    let trace3 = {
        x: psaNumbers,
        y: elaProficiency,
        name: 'ELA Proficiency',
        type: 'bar',
        marker: { color: 'rgb(255,153,51)' },
        text: psaNumbers.map(num => `PSA: ${num}`),
        hoverinfo: 'text+y',
        yaxis: 'y1'
    };

    let trace4 = {
        x: psaNumbers,
        y: mathProficiency,
        name: 'Math Proficiency',
        type: 'bar',
        marker: { color: 'rgb(50,171,96)' },
        text: psaNumbers.map(num => `PSA: ${num}`),
        hoverinfo: 'text+y',
        yaxis: 'y1'
    };

    let layout = {
        title: 'Total Crimes and Elementary School Scores by PSA',
        width: 1200,
        barmode: 'group',
        xaxis: { 
            title: 'PSA Number',
            type: 'category' // Treat x-axis as categorical values
        },
        yaxis: {
            title: 'Total Crimes',
            side: 'left',
            overlaying: 'y2'  // Overlay with y2 axis
        },
        yaxis2: {
            title: 'School Metrics Percentage',
            side: 'right',
        },
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        traceorder: 'normal' // Ensure that later traces are on top
    };

    // Ensure Total Crimes is plotted first (in the background) and the other metrics are plotted afterward
    Plotly.newPlot('barGraphDiv', [trace1, trace3, trace4, trace2], layout);
}).catch(function(error) {
    console.error('Error fetching and parsing the data for bar graphs:', error);
});
