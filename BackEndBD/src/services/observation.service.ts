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
        try{
            return await this.observationRepository.AddAsync(item, userId)
        }catch(error){
            throw new Error("Error trying to insert an Observation: ",error)
        }
    }
    async UpdateAsync(item: Observation, userId: string) {
        try{
            return await this.observationRepository.UpdateAsync(item, userId)
        }catch(error){
            throw new Error("Error trying to update an Observation: ",error)
        }
    }
    async DeleteAsync(id: string, userId: string) {
        try{
            return await this.observationRepository.DeleteAsync(id, userId)
        }catch(error){
            throw new Error("Error trying to delete an Observation: ",error)
        }
    }
    async GetByIdAsync(id: string): Promise<ObservationDTO> {
        try{
            const observation: Observation = await this.observationRepository.GetAsync(id)
    
            return {
                Id: observation[0].Id,
                ObservationText: observation[0].ObservationText
            }
        }catch(error){
            throw new Error("Error trying to get Observation by id: ",error)
        }
    }
    async ListAsync(
        idObservation: string = '', 
        observationText: string = '', 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<ObservationDTO[]> {
            try{
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
            }catch(error){
                throw new Error("Error trying to list Observations",error)
            }
    }
}