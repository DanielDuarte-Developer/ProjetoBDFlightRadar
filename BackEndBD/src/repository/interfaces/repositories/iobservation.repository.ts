import { Observation } from "../../../model/observation.model";

export interface IObservationRepository {
    /**
     * List the models records
     * 
     * @param idObservation The identifier
     * @param observationText Plane year
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListObservations(
        idModel: string,
        observationText : string,
        sortField: string,
        sortAscending: boolean) : Promise<Observation[]>
}