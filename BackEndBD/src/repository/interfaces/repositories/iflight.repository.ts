import { Flight } from "../../../model/flight.model";

export interface IFlightRepository {
    /**
     * List the flights records
     * 
     * @param idFlight The identifier
     * @param idObservation The observation identifier
     * @param idAirplane The Airplane identifier
     * @param flightCode Flight code
     * @param passengers Flight passengers
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListFlights(
        idFlight: string,
        idObservation : string,
        idAirplane : string,
        flightCode: string,
        passengers: number,
        sortField: string,
        sortAscending: boolean) : Promise<Flight[]>
}