"use strict"

class TaskApi {

    constructor() {
    }

    // ########################### Airline Mehthods ############################

    /**
    * 
    * @returns {Promise<Airline[]>}
    */
    async findAirlines(filters = {}) {
        try{
            // Monta a query string a partir dos filtros
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/airline?${queryParams}`, {
                method: 'GET',
            })).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airline>}
     */
    async getAirline(airlineId) {
        try{
            return (await fetch(`http://localhost:3000/airline/${airlineId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createAirline(value) {
        try{     
            const req = fetch(`http://localhost:3000/airline`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateAirline(value) {
        try{
            const req = fetch(`http://localhost:3000/airline`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteAirline(airlineId) {
        try {
            const response = fetch(`http://localhost:3000/airline/${airlineId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return response
        } catch (error) {
            throw new Error("Error: ", error)
        }

    }

    // ########################### Airplane Methods ############################

    /**
    * 
    * @returns {Promise<Airplane[]>}
    */
    async findAirplanes(filters = {}) {
        try{
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/airplane?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airplane>}
     */
    async getAirplane(airplaneId) {
        try{ 
            return (await fetch(`http://localhost:3000/airplane/${airplaneId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createAirplane(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airplane`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateAirplane(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airplane`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteAirplane(airplaneId) {
        try {
            const response = fetch(`http://localhost:3000/airplane/${airplaneId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }
        catch (error) {
            throw new Error("Error: ", error)
        }
    }

    // ########################### Airport Methods ############################

    /**
    * 
    * @returns {Promise<Airport[]>}
    */
    async findAirports(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/airport?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Airport>}
     */
    async getAirport(airportId) {
        try{ 
            return (await fetch(`http://localhost:3000/airport/${airportId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createAirport(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateAirport(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airport`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteAirport(airportId) {
        try{
            const response = fetch(`http://localhost:3000/airport/${airportId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }catch(error){
            throw new Error("Error: ", error)
        }
        
    }

    // ########################### Brand Methods ############################

    /**
    * 
    * @returns {Promise<Brand[]>}
    */
    async findBrands(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/brand?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Brand>}
     */
    async getBrand(brandId) {
        try{ 
            return (await fetch(`http://localhost:3000/brand/${brandId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createBrand(value) {
        try{ 
            const req = fetch(`http://localhost:3000/brand`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateBrand(value) {
        try{ 
            const req = fetch(`http://localhost:3000/brand`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteBrand(brandId) {
        try{ 
            try{
                const response = fetch(`http://localhost:3000/brand/${brandId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                return response;
            }catch(error){
                console.log(error)
            }
        }catch(error){
            throw new Error("Error: ",error)
        }
        
    }

    // ########################### Brand Methods ############################

    /**
    * 
    * @returns {Promise<Country[]>}
    */
    async findCountries(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/country?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Country>}
     */
    async getCountry(countryId) {
        try{ 
            return (await fetch(`http://localhost:3000/country/${countryId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createCountry(value) {
        try{ 
            const req = fetch(`http://localhost:3000/country`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateCountry(value) {
        try{ 
            const req = fetch(`http://localhost:3000/country`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteCountry(countryId) {
        try{
            const response = fetch(`http://localhost:3000/country/${countryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }catch(error){
            throw new Error("Error: ", error)
        }
        
    }

    // ########################### Flight Methods ############################

    /**
    * 
    * @returns {Promise<Flight[]>}
    */
    async findFlights(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/flight?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Flight>}
     */
    async getFlight(flightId) {
        try{ 
            return (await fetch(`http://localhost:3000/flight/${flightId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createFlight(value) {
        try{ 
            const req = fetch(`http://localhost:3000/flight`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateFlight(value) {
        try{ 
            const req = fetch(`http://localhost:3000/flight`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteFlight(flightId) {
        try{
            const response = fetch(`http://localhost:3000/flight/${flightId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }catch(error){
            throw new Error("Error: ", error)
        }
    }

    // ########################### Model Methods ############################

    /**
    * 
    * @returns {Promise<Model[]>}
    */
    async findModels(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/model?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Model>}
     */
    async getModel(modelId) {
        try{ 
            return (await fetch(`http://localhost:3000/model/${modelId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createModel(value) {
        try{ 
            const req = fetch(`http://localhost:3000/model`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateModel(value) {
        try{ 
            const req = fetch(`http://localhost:3000/model`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteModel(modelId) {
        try{
            const response = fetch(`http://localhost:3000/model/${modelId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }catch(error){
            throw new Error("Error: ",error)
        }
        
    }

    // ########################### Airport Flight Methods ############################

    /**
    * 
    * @returns {Promise<AirportFlight[]>}
    */
    async findAirportFlights(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/airportFlight?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<AirportFlight>}
     */
    async getAirportFlight(airportFlightId) {
        try{ 
            return (await fetch(`http://localhost:3000/airportFlight/${airportFlightId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createAirportFlight(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airportFlight`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateAirportFlight(value) {
        try{ 
            const req = fetch(`http://localhost:3000/airportFlight`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    // ########################### Observation Methods ############################

    /**
    * 
    * @returns {Promise<Observation[]>}
    */
    async findObservations(filters = {}) {
        try{ 
            const queryParams = new URLSearchParams(filters).toString();
            return (await fetch(`http://localhost:3000/observation?${queryParams}`)).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Observation>}
     */
    async getObservation(observationId) {
        try{ 
            return (await fetch(`http://localhost:3000/observation/${observationId}`)).json()
        }catch(error){
            throw new Error("Error: ",error)
        }
    }


    async createObservation(value) {
        try{ 
            const req = fetch(`http://localhost:3000/observation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async updateObservation(value) {
        try{ 
            const req = fetch(`http://localhost:3000/observation`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
    
            return (await req).json();
        }catch(error){
            throw new Error("Error: ",error)
        }
    }

    async deleteObservation(observationId) {
        try{
            const response = fetch(`http://localhost:3000/observation/${observationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response
        }catch(error){
            throw new Error("Error: ", error)
        }
        
    }
}