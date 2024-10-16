// Function to move the plane
function moveAndCreatePlane(departureLat, departureLng, destinyLat, destinyLng, airplane) {
    const departureCoordinations = L.latLng(departureLat, departureLng);
    const destinyCoordinations = L.latLng(destinyLat, destinyLng);

    // Criando um ícone personalizado
    const customIcon = L.icon({
        iconUrl: 'images/airplane.png', // URL img to the icon
        iconSize: [24, 24], // icone size
        iconAnchor: [10, 14.5], // Icon anchor point (bottom center) change for the respective icon
    });

    // Create a marker with the custom icon (starting position)
    const planeMarker = L.marker([departureLat, departureLng], { icon: customIcon }).addTo(map); 
    // Get the Curvved point to draw an line based on the curvature of the earth
    const curvedPoints = getCurvedPoints(departureCoordinations, destinyCoordinations, 100);
    // Draw an line to departaur to destiny
    const polyline = L.polyline(curvedPoints, { color: 'blue' }); 
    
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


    // Auxiliar functions

    // Function which calculates through 2 points latitude and longitude based on the curvature of the earth
    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distância em km

        return distance;
    }
    // Function that obtains the lat longitude of a point based on the curvature of the earth
    function getCurvedPoints(latlngA, latlngB, segments) {
        const points = [];
        const distance = haversine(latlngA.lat, latlngA.lng, latlngB.lat, latlngB.lng); // Distance Between the 2 points
        const dLat = (latlngB.lat - latlngA.lat) / segments;
        const dLng = (latlngB.lng - latlngA.lng) / segments;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments; // Proportion along the line
            const lat = latlngA.lat + dLat * i; // Intermediate latitude
            const lng = latlngA.lng + dLng * i + Math.sin(Math.PI * t) * (distance * 0.002); // Curvature value to adjust if necessary
            points.push([lat, lng]);
        }
        return points;
    }

}


function moveAndCreatePlane(departure, destiny, airplane) {
    const departureCoordinations = L.latLng(departure[0], departure[1]);
    const destinyCoordinations = L.latLng(destiny[0], destiny[1]);

    // Criando um ícone personalizado
    const customIcon = L.icon({
        iconUrl: 'images/airplane.png', // URL img to the icon
        iconSize: [24, 24], // Icone size
        iconAnchor: [10, 14.5], // Icon anchor point (bottom center) change for the respective icon
    });

    // Create a marker with the custom icon (starting position)
    const planeMarker = L.marker([departure[0], departure[1]], { icon: customIcon }).addTo(map);  
    // Get the Curvved point to draw an line based on the curvature of the earth
    const curvedPoints = getCurvedPoints(departureCoordinations, destinyCoordinations, 100);
    // Draw an line to departaur to destiny
    const polyline = L.polyline(curvedPoints, { color: 'blue' }); 

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


     // Auxiliar functions

    // Function which calculates through 2 points latitude and longitude based on the curvature of the earth
    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distância em km

        return distance;
    }
    // Function that obtains the lat longitude of a point based on the curvature of the earth
    function getCurvedPoints(latlngA, latlngB, segments) {
        const points = [];
        const distance = haversine(latlngA.lat, latlngA.lng, latlngB.lat, latlngB.lng); // Distance Between the 2 points
        const dLat = (latlngB.lat - latlngA.lat) / segments;
        const dLng = (latlngB.lng - latlngA.lng) / segments;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments; // Proportion along the line
            const lat = latlngA.lat + dLat * i; // Intermediate latitude
            const lng = latlngA.lng + dLng * i + Math.sin(Math.PI * t) * (distance * 0.002); // Curvature value to adjust if necessary
            points.push([lat, lng]);
        }
        return points;
    }
}