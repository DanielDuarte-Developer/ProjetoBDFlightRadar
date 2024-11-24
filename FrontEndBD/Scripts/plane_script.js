// Function to move the plane
function moveAndCreatePlane(departureLat, departureLng, destinyLat, destinyLng, map, id) {
    const departureCoordinations = L.latLng(departureLat, departureLng);
    const destinyCoordinations = L.latLng(destinyLat, destinyLng);
    // Create an custom icon
    const customIcon = L.icon({
        iconUrl: '../images/airplane.png', // URL img to the icon
        iconSize: [24, 24], // Icone size
        iconAnchor: [10, 14.5], // Icon anchor point (bottom center) change for the respective icon
    });

    // Create a marker with the custom icon (starting position)
    const planeMarker = L.marker([departureLat, departureLng], { icon: customIcon }).addTo(map);
    // Get the Curved point to draw an line based on the curvature of the earth
    const curvedPoints = getCurvedPoints(departureCoordinations, destinyCoordinations, 100);
    // Draw an line to departaur to destiny
    const polyline = L.polyline(curvedPoints, { color: 'blue' });

    // Make the "plane" (marker) move it
    movePlane(departureCoordinations, destinyCoordinations, planeMarker)

    // When clicked on the "plane" will show the modal with all information
    planeMarker.on('click', function () {
        document.getElementById('modal-' + id).style.display = 'block'; // Show modal
        document.getElementById('overlay-' + id).style.display = 'block'; // Show darkened background
        map.addLayer(polyline);
    })

    // Close modal window
    document.getElementById('closeBtn-' + id).onclick = function () {
        document.getElementById('modal-' + id).style.display = 'none';
        document.getElementById('overlay-' + id).style.display = 'none';
        map.removeLayer(polyline);
    };


    // Close modal window when clicking outside it
    document.getElementById('overlay-' + id).onclick = function () {
        document.getElementById('modal-' + id).style.display = 'none';
        document.getElementById('overlay-' + id).style.display = 'none';
        map.removeLayer(polyline);
    };

}

//**********  Auxiliar functions **************/

// Function to move the plane
function movePlane(departure, destiny, airplane, time) {
    let currentLat = departure.lat;
    let currentLng = departure.lng;

    const totalSteps = 100; // Total de passos a serem realizados
    const stepLat = (destiny.lat - currentLat) / totalSteps; // Diferença latitude
    const stepLng = (destiny.lng - currentLng) / totalSteps; // Diferença longitude

    let count = 0;

    const randomDelay = Math.random() * 1000;
    setTimeout(() => {
        const randomSpeedFactor = 1 + Math.random() * 0.5;
        const moveInterval = setInterval(() => {
            if (count < totalSteps) {
                currentLat += stepLat * randomSpeedFactor;
                currentLng += stepLng * randomSpeedFactor;
                airplane.setLatLng([currentLat, currentLng]); // Atualiza a posição do marcador

                count++;
            } else {
                clearInterval(moveInterval); // Para o movimento
            }
        }, 1500); // Move a cada 1500 milissegundos (1 segundo e meio)
    }, randomDelay);
}
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