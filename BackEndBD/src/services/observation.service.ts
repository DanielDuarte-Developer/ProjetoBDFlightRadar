import { ObservationDTO } from "../model/dto/observation.model.dto";
import { Observation } from "../model/observation.model";
import { ObservationRepository } from "../repository/observation.repository";
import { IObservationService } from "./interfaces/iobservation.service";

export class ObservationService implements IObservationService {
    protected observationRepository: ObservationRepository

    constructor(observationRepository: ObservationRepository) {
        this.observationRepository = observationRepository
    }
    async AddAsync(item: Observation, userId: string) {
        return await this.observationRepository.AddAsync(item, userId)
    }
    async UpdateAsync(item: Observation, userId: string) {
        return await this.observationRepository.UpdateAsync(item, userId)
    }
    async DeleteAsync(id: string, userId: string) {
        return await this.observationRepository.DeleteAsync(id, userId)
    }
    async GetByIdAsync(id: string): Promise<ObservationDTO> {
        const observation: Observation = await this.observationRepository.GetAsync(id)

        return {
            Id: observation[0].Id,
            ObservationText: observation[0].ObservationText
        }
    }
    async ListAsync(
        idObservation: string = '', 
        observationText: string = '', 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<ObservationDTO[]> {
        const observations = await this.observationRepository.ListObservations(idObservation, observationText, sortField, sortAscending)

        const observationDTOs = await Promise.all(
            observations[0].map(async (observation) => {
                return {
                    Id: observation.Id,
                    ObservationText: observation.ObservationText
                }
            })
        );

        return observationDTOs
    }
}