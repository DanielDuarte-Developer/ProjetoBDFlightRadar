export interface IAirportFlightRepository{
    /**
     * List the AirportAirplaneFlight records
     * 
     * @param idAirport The identifier
     * @param idFlight Flight identifier
     * @param timeMarker Time mark of the flight on the airport
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirportFlights(
        idAirport : string,
        idFlight : string,
        timeMarker: string,
        sortField: string,
        sortAscending: boolean)
}