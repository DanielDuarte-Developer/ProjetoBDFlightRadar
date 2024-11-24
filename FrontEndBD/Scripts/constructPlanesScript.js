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
    await populateModal()
}



async function populateModal() {
    const observations = await loadObservations()
    const airports = await loadAiports()
    const airplanes = await loadAirplanes()

    const button = document.getElementById("btn-add")
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementById("closeModal");
    const saveButton = document.getElementById("saveButton");

    button.addEventListener('click', () => {
        // Preencher os selects com os dados
        // Para Observation
        const observationOptions = observations.map(obs => ({
            value: obs.Id,
            label: obs.ObservationText
        }));
        populateSelect('observationSelect', observationOptions);

        // Para Airplane
        const airplaneOptions = airplanes.map(airplane => ({
            value: airplane.Id,
            label: airplane.ModelObj.ModelName
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
            IdObservation: document.getElementById("observationSelect").value,
            IdAirplane: document.getElementById("modelSelect").value,
            FlightCode: document.getElementById("flightCode").value,
            Passengers: document.getElementById("passengers").value
        };
        await CreateFlight(flight);
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

async function CreateFlight(flightData){
    try{
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
    }catch(error){
        console.log("Error trying to insert new flight, and the associatate table ", error)
    }
    
}

main()
