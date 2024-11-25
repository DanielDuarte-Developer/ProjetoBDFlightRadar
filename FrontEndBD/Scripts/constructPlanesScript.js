const taskApi = new TaskApi()
async function main() {
    populateMapAndModal();
}
async function populateMapAndModal() {
    const mainContent = document.querySelector('.content');
    const flightsAirports = await loadFlightsAirports()
    const processedFlightIds = new Set();

    // Remover todos os marcadores e outras camadas no mapa
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    for (const flightAiport of flightsAirports) {

        const flightId = flightAiport.FlightObj.Id;
        if (!processedFlightIds.has(flightId)) {
            const mapValues = await taskApi.getMapPlaneValues(flightId);
            console.log(mapValues)
            const modalContent = await createModalContent(flightAiport)
            mainContent.appendChild(modalContent)
            moveAndCreatePlane(mapValues[0].StartLat, mapValues[0].StartLong, mapValues[0].EndLat, mapValues[0].EndLong, map, mapValues[0].FlightId)
            processedFlightIds.add(flightId);
        }
    }
    await populateModal()
}

async function populateModal() {
    const airports = await loadAiports()
    const airplanes = await loadAirplanes()

    const button = document.getElementById("btn-add")
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementById("closeModal");
    const saveButton = document.getElementById("saveButton");

    button.addEventListener('click', () => {
        // Preencher os selects com os dados
        // Para Airplane
        const airplaneOptions = airplanes.map(airplane => ({
            value: airplane.Id,
            label: airplane.AirlineObj.AirlineName + " - " + airplane.ModelObj.ModelName
        }));
        populateSelect('modelSelect', airplaneOptions);

        // Para Airport
        const airportOptions = airports.map(airport => ({
            value: airport.Id,
            label: airport.AirportName
        }));
        populateSelect('airportSelect-departure', airportOptions);
        populateSelect('airportSelect-arrival', airportOptions);

        // Mostrar o modal
        modal.style.display = "block";
    })



    // Evento de clique no botão "Save"
    saveButton.addEventListener('click', async () => {

        // Criação do primeiro JSON 'flight'
        const flight = {
            IdObservation: null,
            IdAirplane: document.getElementById("modelSelect").value,
            FlightCode: document.getElementById("flightCode").value,
            Passengers: document.getElementById("passengers").value
        };

        await CreateFlight(flight);

        populateMapAndModal();

        // Fechar o modal após salvar
        modal.style.display = "none";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Oculta o modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
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

async function loadObservations() {
    try {
        const observations = await taskApi.findObservations();
        // Verifica se os dados foram retornados
        if (!observations) {
            console.log("Nenhuma observation encontrada.");
            return;
        }

        return observations
    } catch (error) {
        // Trata erros ao buscar os observations
        console.error("Erro ao buscar obseravations:", error.message || error);
    }
}

async function loadAirplanes() {
    try {
        const airplanes = await taskApi.findAirplanes();
        // Verifica se os dados foram retornados
        if (!airplanes) {
            console.log("Nenhum avião encontrado.");
            return;
        }

        return airplanes
    } catch (error) {
        // Trata erros ao buscar os aviões
        console.error("Erro ao buscar aviões:", error.message || error);
    }
}

async function loadAiports() {
    try {
        const airports = await taskApi.findAirports();
        // Verifica se os dados foram retornados
        if (!airports) {
            console.log("Nenhum airoporto encontrado.");
            return;
        }

        return airports
    } catch (error) {
        // Trata erros ao buscar os airportos
        console.error("Erro ao buscar airportos:", error.message || error);
    }
}

async function createModalContent(flightData) {
    const CardInfo = await taskApi.getFlightCardInfo(flightData.FlightObj.Id);

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="modal" id="modal-${flightData.FlightObj.Id}">
            <button class="close-btn" id="closeBtn-${flightData.FlightObj.Id}">&times;</button>
            <div class="info">
                <div class="header">
                    <h2>${CardInfo[0].airlineN || "Airline Unknown"}</h2>
                    <span class="flight-code">${CardInfo[0].flightCD || "Code Unknown"}</span>
                </div>
                <div class="image-container">
                    <img src="${CardInfo[0].airPlaneModelImage || '../images/Noddy.png'}" alt="Plane" class="plane-image" />
                </div>
                <div class="flight-info">
                    <div class="row">
                        <div class="column">
                            <h3>Partida</h3>
                            <p class="airport-code">${CardInfo[0].startAirportCode || "N/A"}</p>
                            <p class="time">${new Date(CardInfo[0].startTime).toLocaleString() || "N/A"}</p>
                        </div>
                        <div class="column">
                            <img src="../images/right-arrow.png" alt="Arrow" class="arrow" />
                        </div>
                        <div class="column">
                            <h3>Chegada</h3>
                            <p class="airport-code">${CardInfo[0].endAirportCode || "N/A"}</p>
                            <p class="time">${new Date(CardInfo[0].endT).toLocaleString() || "N/A"}</p>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <div class="row">
                        <p><strong>Aeroporto de Partida:</strong> ${CardInfo[0].startAirportName || "N/A"}</p>
                        <p><strong>Localização de Partida:</strong> ${CardInfo[0].startLocation || "N/A"}</p>
                    </div>
                    <div class="row">
                        <p><strong>Aeroporto de Chegada:</strong> ${CardInfo[0].endAirportName || "N/A"}</p>
                        <p><strong>Localização de Chegada:</strong> ${CardInfo[0].endLocation || "N/A"}</p>
                    </div>
                    <div class="row">
                        <p><strong>País de Partida:</strong> ${CardInfo[0].startCountry || "N/A"}</p>
                        <p><strong>País de Chegada:</strong> ${CardInfo[0].endCountry || "N/A"}</p>
                    </div>
                    <div class="row">
                        <p><strong>Aeronave:</strong> ${CardInfo[0].airplaneBrandName || "N/A"} ${CardInfo[0].airplaneModelName || "N/A"}</p>
                        <p><strong>Capacidade:</strong> ${CardInfo[0].passeng || "N/A"} passageiros</p>
                    </div>
                    <div class="row">
                        <p><strong>Companhia Aérea:</strong> ${CardInfo[0].airlineN || "N/A"}</p>
                        <p><strong>Tempo de Voo:</strong> ${CardInfo[0].flightDuration || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" id="overlay-${flightData.FlightObj.Id}"></div>
    `;
    return container;
}

// Função para preencher os selects
const populateSelect = (selectId, options) => {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Limpar as opções existentes
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        selectElement.appendChild(optionElement);
    });
};

async function CreateFlight(flightData) {
    try {
        const response = await taskApi.createFlight(flightData)
        const id = response.value[0][0].p_Id

        await taskApi.createAirportFlight({
            IdAirport: document.getElementById("airportSelect-departure").value,
            IdFlight: id, // The Id comes when the flights is inserted then he returns the ID
            TimeMarker: document.getElementById("timeMarkerStart").value

        });

        await taskApi.createAirportFlight({
            IdAirport: document.getElementById("airportSelect-arrival").value,
            IdFlight: id, // The Id comes when the flights is inserted then he returns the ID
            TimeMarker: document.getElementById("timeMarkerEnd").value
        })
    } catch (error) {
        console.log("Error trying to insert new flight, and the associatate table ", error)
    }

}

main()
