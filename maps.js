// Initialize the map
var map = L.map('map').setView([0, 0], 2); // Centered at [0, 0] with zoom level 2

// Add a tile layer to the map (OpenStreetMap in this case)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch and add ships data
async function addShipsData() {
    try {
        const response = await fetch('');
        const data = await response.json();
        
        // Assuming the data is in GeoJSON format
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup("Ship: " + feature.properties.name);
                }
            }
        }).addTo(map);
    } catch (error) {
        console.error('Error fetching ships data:', error);
    }
}

// Function to fetch and add fish amount data
async function addFishData() {
    try {
        const response = await fetch('https://gateway.api.globalfishingwatch.org/v2/datasets/public-eez-areas/user-context-layers');
        const data = await response.json();
        
        // Assuming the data is in GeoJSON format
        L.geoJson(data, {
            style: function (feature) {
                return {
                    color: feature.properties.color, // Color indicates fish amount
                    weight: 2,
                    opacity: 1
                };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("Fish Amount: " + feature.properties.amount);
            }
        }).addTo(map);
    } catch (error) {
        console.error('Error fetching fish data:', error);
    }
}

// Fetch and add data from both APIs without blocking UI
addShipsData();
addFishData();
