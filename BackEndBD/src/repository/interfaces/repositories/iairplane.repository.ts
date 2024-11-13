import { Airplane } from "../../../model/airplane.model";

export interface IAirplaneRepository {
    /**
     * List the Airplane records
     * 
     * @param idAirplane The identifier
     * @param idModel Model identifier
     * @param idArline Arline identifier
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListAirplanes ( 
        idAirplane: string, 
        idModel: string, 
        idArline: string,
        sortField: string,
        sortAscending: boolean) : Promise<Airplane[]>
}