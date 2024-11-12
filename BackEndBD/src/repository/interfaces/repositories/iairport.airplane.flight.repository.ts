export interface IAirportAirplaneFlightRepository{
    /**
     * List the AirportAirplaneFlight records
     * 
     * @param idAirport The identifier
     * @param idFlight Flight identifier
     * @param idPlane Plane identifier
     * @param departure Departure time
     * @param arrival Arrival time
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirportAirplaneFlights(
        idAirport : string,
        idFlight : string,
        idPlane : string,
        departure : string,
        arrival : string,
        status: string,
        sortField: string,
        sortAscending: boolean)
}