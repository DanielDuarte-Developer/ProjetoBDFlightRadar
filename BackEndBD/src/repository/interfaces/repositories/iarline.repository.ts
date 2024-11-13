import { Airline } from "../../../model/airline.model";

export interface IArlineRepository {
    /**
     * List the Arlines records
     * 
     * @param idAirline The identifier
     * @param idCountry Country identifier
     * @param arlineName Arline Name
     * @param arlineCode Arline Code
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListArlines(
        idAirline: string, 
        idCountry: string, 
        arlineName: string,
        arlineCode: string,
        sortField: string,
        sortAscending: boolean): Promise<Airline[]>
}