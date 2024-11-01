import { Airport } from "../../../model/airport.model";

export interface IAirportRepository  {
     /**
     * List the Airport records
     * 
     * @param idAirport The identifier
     * @param idCountry Country identifier
     * @param airportName Airport name
     * @param airportCode Airport Code
     * @param airportLocationName Aiport location name
     * @param locationLatitude Airport location latitude
     * @param locationLongitude Airport location longitude
     * @param status Registry Status 
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirports(
        idAirport: string, 
        idCountry: string, 
        airportName: string,
        airportCode: string,
        airportLocationName: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Airport[]>
}