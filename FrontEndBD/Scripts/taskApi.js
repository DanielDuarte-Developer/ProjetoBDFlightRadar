"use strict"

class TaskApi {

    constructor() {
    }

    // ########################### Airline Mehthods ############################

    /**
    * 
    * @returns {Promise<Airline[]>}
    */
    async findAirlines(filters={}) {
        // Monta a query string a partir dos filtros
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/airline?${queryParams}`, {
            method: 'GET',
        })).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airline>}
     */
    async getAirline(airlineId) {
        return (await fetch(`http://localhost:3000/airline/${airlineId}`)).json()
    }


    async createAirline(value) {
        const req = fetch(`http://localhost:3000/airline`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateAirline(value) {
        const req = fetch(`http://localhost:3000/airline`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteAirline(airlineId) {
        fetch(`http://localhost:3000/airline/${airlineId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Airplane Methods ############################

    /**
    * 
    * @returns {Promise<Airplane[]>}
    */
    async findAirplanes(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/airplane?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airplane>}
     */
    async getAirplane(airplaneId) {
        return (await fetch(`http://localhost:3000/airplane/${airplaneId}`)).json()
    }


    async createAirplane(value) {
        const req = fetch(`http://localhost:3000/airplane`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateAirplane(value) {
        const req = fetch(`http://localhost:3000/airplane`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteAirplane(airplaneId) {
        fetch(`http://localhost:3000/airplane/${airplaneId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Airport Methods ############################

    /**
    * 
    * @returns {Promise<Airport[]>}
    */
    async findAirports(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/airport?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airport>}
     */
    async getAirport(airportId) {
        return (await fetch(`http://localhost:3000/airport/${airportId}`)).json()
    }


    async createAirport(value) {
        const req = fetch(`http://localhost:3000/airport`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateAirport(value) {
        const req = fetch(`http://localhost:3000/airport`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteAirport(airportId) {
        fetch(`http://localhost:3000/airport/${airportId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Brand Methods ############################

    /**
    * 
    * @returns {Promise<Brand[]>}
    */
    async findBrands(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/brand?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Brand>}
     */
    async getBrand(brandId) {
        return (await fetch(`http://localhost:3000/brand/${brandId}`)).json()
    }


    async createBrand(value) {
        const req = fetch(`http://localhost:3000/brand`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateBrand(value) {
        const req = fetch(`http://localhost:3000/brand`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteBrand(brandId) {
        fetch(`http://localhost:3000/brand/${brandId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Brand Methods ############################

    /**
    * 
    * @returns {Promise<Country[]>}
    */
    async findCountries(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/country?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Country>}
     */
    async getCountry(countryId) {
        return (await fetch(`http://localhost:3000/country/${countryId}`)).json()
    }


    async createCountry(value) {
        const req = fetch(`http://localhost:3000/country`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateCountry(value) {
        const req = fetch(`http://localhost:3000/country`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteCountry(countryId) {
        fetch(`http://localhost:3000/country/${countryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Flight Methods ############################

    /**
    * 
    * @returns {Promise<Flight[]>}
    */
    async findFlights(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/flight?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Flight>}
     */
    async getFlight(flightId) {
        return (await fetch(`http://localhost:3000/flight/${flightId}`)).json()
    }


    async createFlight(value) {
        const req = fetch(`http://localhost:3000/flight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateFlight(value) {
        const req = fetch(`http://localhost:3000/flight`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteFlight(flightId) {
        fetch(`http://localhost:3000/flight/${flightId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Model Methods ############################

    /**
    * 
    * @returns {Promise<Model[]>}
    */
    async findModels(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/model?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Model>}
     */
    async getModel(modelId) {
        return (await fetch(`http://localhost:3000/model/${modelId}`)).json()
    }


    async createModel(value) {
        const req = fetch(`http://localhost:3000/model`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateModel(value) {
        const req = fetch(`http://localhost:3000/model`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteModel(modelId) {
        fetch(`http://localhost:3000/model/${modelId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    // ########################### Airport Flight Methods ############################

    /**
    * 
    * @returns {Promise<AirportFlight[]>}
    */
    async findAirportFlights(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/airportFlight?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<AirportFlight>}
     */
    async getAirportFlight(airportFlightId) {
        return (await fetch(`http://localhost:3000/airportFlight/${airportFlightId}`)).json()
    }


    async createAirportFlight(value) {
        const req = fetch(`http://localhost:3000/airportFlight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateAirportFlight(value) {
        const req = fetch(`http://localhost:3000/airportFlight`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    // ########################### Observation Methods ############################

    /**
    * 
    * @returns {Promise<Observation[]>}
    */
    async findObservations(filters={}) {
        const queryParams = new URLSearchParams(filters).toString();
        return (await fetch(`http://localhost:3000/observation?${queryParams}`)).json();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Observation>}
     */
    async getObservation(observationId) {
        return (await fetch(`http://localhost:3000/observation/${observationId}`)).json()
    }


    async createObservation(value) {
        const req = fetch(`http://localhost:3000/observation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async updateObservation(value) {
        const req = fetch(`http://localhost:3000/observation`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        return (await req).json();
    }

    async deleteObservation(observationId) {
        fetch(`http://localhost:3000/observation/${observationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}