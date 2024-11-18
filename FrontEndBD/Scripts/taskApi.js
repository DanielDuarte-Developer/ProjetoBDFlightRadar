"use strict"

class TaskApi {

    constructor() {
    }

    // ########################### Airline Mehthods ############################

    /**
    * 
    * @returns {Promise<Airline[]>}
    */
    async findAirlines() {
        return (await fetch(`http://localhost:3000/airline`)).json();
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
    async findAirplanes() {
        return (await fetch(`http://localhost:3000/airplane`)).json();
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
    async findAirports() {
        return (await fetch(`http://localhost:3000/airport`)).json();
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
    async findBrands() {
        return (await fetch(`http://localhost:3000/brand`)).json();
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
    async findCountries() {
        return (await fetch(`http://localhost:3000/country`)).json();
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
    async findFlights() {
        return (await fetch(`http://localhost:3000/flight`)).json();
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
    async findModels() {
        return (await fetch(`http://localhost:3000/model`)).json();
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
    async findAirportFlights() {
        return (await fetch(`http://localhost:3000/airportFlight`)).json();
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

}