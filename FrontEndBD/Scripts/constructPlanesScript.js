const taskApi = new TaskApi()
async function main() {
    const mainContent = document.querySelector('.content');
    const flightsAirports = await loadFlightsAirports()
    console.log("FlightsAirports: ", flightsAirports)
    flightsAirports.forEach(flightAiport => {
        const modalContent = createModalContent(flightAiport)
        mainContent.appendChild(modalContent)
        moveAndCreatePlane(flightAiport.AirportObj.LocationLatitude, flightAiport.AirportObj.LocationLongitude, 38.736946, -9.142685, map, flightAiport.FlightObj.Id)
    })
}

async function loadFlightsAirports() {
    try {
        const flightsAirports = await taskApi.findAirportFlights();
        // Verifica se os dados foram retornados
        if (!flightsAirports) {
            console.log("Nenhum voo associado a um aeroporto encontrado.");
            return;
        }

        return flightsAirports
    } catch (error) {
        // Trata erros ao buscar os voos
        console.error("Erro ao buscar voos:", error.message || error);
    }
}

function createModalContent(flightData) {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="modal" id="modal-${flightData.FlightObj.Id}">
            <button class="close-btn" id="closeBtn-${flightData.FlightObj.Id}">&times;</button>
            <div class="info">
                <div class="header">
                    <h2>${flightData.FlightObj.AirplaneObj.AirlineObj.AirlineName || "Airline Unknown"}</h2>
                    <span class="flight-code">${flightData.FlightObj.FlightCode || "Code Unknown"}</span>
                </div>
                <div class="image-container">
                    <img src="../images/boing.jpg" alt="Avião" class="plane-image" />
                </div>
                <div class="flight-info">
                    <div class="row">
                        <div class="column">
                            <h3>Partida</h3>
                            <p class="airport-code">${flightData.AirportObj.AirportCode || "N/A"}</p>
                            <p class="time">${new Date(flightData.TimeMarker).toLocaleTimeString() || "N/A"}</p>
                        </div>
                        <div class="column">
                            <img src="../images/right-arrow.png" alt="Arrow" class="arrow" />
                        </div>
                        <div class="column">
                            <h3>Chegada</h3>
                            <p class="airport-code">--</p> <!-- Replace with actual arrival code if available -->
                            <p class="time">--</p> <!-- Replace with actual arrival time if available -->
                        </div>
                    </div>
                </div>
                <div class="details">
                    <div class="row">
                        <p><strong>Aeroporto:</strong> ${flightData.AirportObj.AirportName || "N/A"}</p>
                        <p><strong>Localização:</strong> ${flightData.AirportObj.LocationName || "N/A"}</p>
                    </div>
                    <div class="row">
                        <p><strong>Km de Distância:</strong> -- km</p>
                        <p><strong>Tempo de Voo:</strong> --</p> <!-- Add these details if available -->
                    </div>
                    <div class="row">
                        <p><strong>Aeronave:</strong> ${flightData.FlightObj.AirplaneObj.ModelObj.BrandObj.BrandName || "N/A"} ${flightData.FlightObj.AirplaneObj.ModelObj.ModelYear || "N/A"}</p>
                        <p><strong>Capacidade:</strong> ${flightData.FlightObj.AirplaneObj.ModelObj.SitsNumber || "N/A"} passageiros</p>
                    </div>
                    <div class="row">
                        <p><strong>País de Registro:</strong> ${flightData.FlightObj.AirplaneObj.ModelObj.BrandObj.CountryObj.CountryName || "N/A"}</p>
                        <p><strong>Companhia:</strong> ${flightData.FlightObj.AirplaneObj.AirlineObj.AirlineName || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" id="overlay-${flightData.FlightObj.Id}"></div>
    `;
    return container;
}
main()
