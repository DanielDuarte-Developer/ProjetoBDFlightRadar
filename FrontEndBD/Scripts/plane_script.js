// Function to move the plane
function moveAndCreatePlane(departureLat, departureLng, destinyLat, destinyLng, airplane) {
    // Criando um ícone personalizado
    const customIcon = L.icon({
        iconUrl: 'images/airplane.png', // URL img to the icon
        iconSize: [24, 24], // icone size
        iconAnchor: [10, 14.5], // Icon anchor point (bottom center) change for the respective icon
    });

    // Create a marker with the custom icon (starting position)
    const planeMarker = L.marker([departureLat, departureLng], { icon: customIcon }).addTo(map); 
    // Draw an line to departaur to destiny
    const latLngs = [[departureLat, departureLng], [destinyLat, departureLng]];
    const polyline = L.polyline(latLngs, { color: 'blue' }); 
    
    airplane.on('click', function(){
        document.getElementById('modal').style.display = 'block'; // Show modal
        document.getElementById('overlay').style.display = 'block'; // Show darkened background
        map.addLayer(polyline);
    })

    // Close modal window
    document.getElementById('closeBtn').onclick = function() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        map.removeLayer(polyline);
    };

    
     // Close modal window when clicking outside it
    document.getElementById('overlay').onclick = function() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        map.removeLayer(polyline);
    };

    let currentLat = departureLat; // current latitude
    let currentLng = departureLng; // current longitude

    const totalSteps = 100; // Total steps to be taken
    const stepLat = (destinyLat - currentLat) / totalSteps; // Latitude difference
    const stepLng = (destinyLng - currentLng) / totalSteps; // longitude difference
    
    let count = 0;

    const moveInterval = setInterval(() => {
        if (count < totalSteps) {
            currentLat += stepLat;
            currentLng += stepLng;
            planeMarker.setLatLng([currentLat, currentLng]); // Update the marker position
            count++;
        } else {
            clearInterval(moveInterval); // Stop the movement
        }
    }, 2000); // Move each 2000 milisseconds (2 seconds)
}


function moveAndCreatePlane(departure, destiny, airplane) {
    // Criando um ícone personalizado
    const customIcon = L.icon({
        iconUrl: 'images/airplane.png', // URL img to the icon
        iconSize: [24, 24], // Icone size
        iconAnchor: [10, 14.5], // Icon anchor point (bottom center) change for the respective icon
    });

    // Create a marker with the custom icon (starting position)
    const planeMarker = L.marker([departure[0], departure[1]], { icon: customIcon }).addTo(map);  
    // Draw an line to departaur to destiny
    const latLngs = [[departureLat, departureLng], [destinyLat, departureLng]];
    const polyline = L.polyline(latLngs, { color: 'blue' }); 

    airplane.on('click', function() {
        document.getElementById('modal').style.display = 'block'; // Show modal
        document.getElementById('overlay').style.display = 'block'; // Show darkened background
        map.addLayer(polyline);
    })

    // Close modal window
    document.getElementById('closeBtn').onclick = function() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        map.removeLayer(polyline);
    };


    // Close modal window when clicking outside it
    document.getElementById('overlay').onclick = function() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        map.removeLayer(polyline);
    };

    let currentLat = departure[0]; // current latitude
    let currentLng = departure[1]; // current longitude

    const totalSteps = 100; // Total steps to be taken
    const stepLat = (destiny[0] - currentLat) / totalSteps; // Latitude difference
    const stepLng = (destiny[1] - currentLng) / totalSteps; // longitude difference

    let count = 0;

    const moveInterval = setInterval(() => {
        if (count < totalSteps) {
            currentLat += stepLat;
            currentLng += stepLng;
            planeMarker.setLatLng([currentLat, currentLng]); // Update the marker position
            count++;
        } else {
            clearInterval(moveInterval); // Stop the movement
        }
    }, 2000); // Move each 2000 milisseconds (2 seconds)
}