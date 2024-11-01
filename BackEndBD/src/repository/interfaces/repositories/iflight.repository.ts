import { Flight } from "../../../model/flight.model";

export interface IFlightRepository {
    /**
     * List the flights records
     * 
     * @param idFlight The identifier
     * @param flightCode Flight code
     * @param stateFlight Flight state
     * @param passengers Flight passengers
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListFlights(
        idFlight: string,
        flightCode: string,
        stateFlight: string,
        passengers: number,
        status: string,
        sortField: string,
        sortAscending: boolean) : Promise<Flight[]>
}