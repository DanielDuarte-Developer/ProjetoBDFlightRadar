import { Handler, Request, Response } from "express";
import { ObservationRepository } from "../repository/observation.repository";
import { Observation } from "../model/observation.model";

export class ObservationController {
    private observationRepository: ObservationRepository;

    constructor(observationRepository: ObservationRepository) {
        this.observationRepository = observationRepository;
    }

    getObservations(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Observation = req.body
            try {
                // Get the models by the filters given
                const observations = await this.observationRepository.ListObservations(
                    filters.Id,
                    filters.ObservationText)

                // If there is no error, returns a success response
                res.status(200).json(observations)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve observation data.'
                });
            }
        }
    }

    getObservation(): Handler {
        return async (req: Request, res: Response) => {
            const id_observation = req.body
            try {
                // Get observation by id
                const observation = await this.observationRepository.GetAsync(id_observation)

                // If there is no error, returns a success response
                res.status(200).json(observation)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve observation data.'
                });
            }
        }
    }

    addObservation(): Handler {
        return async (req: Request, res: Response) => {
            const object: Observation = req.body
            try {
                // Adds a new observation
                await this.observationRepository.AddAsync(object, 'jonas')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Observation added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new observation.'
                });
            }
        }
    }

    updateObservation(): Handler {
        return async (req: Request, res: Response) => {
            const object: Observation = req.body

            try {
                // Updates the observation
                await this.observationRepository.UpdateAsync(object, 'jonas')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Observation updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the observation.'
                });
            }
        }
    }
    deleteObservation(): Handler {
        return async (req: Request, res: Response) => {
            const id_observation = req.body
            try {
                // Deletes the observation
                await this.observationRepository.DeleteAsync(id_observation, 'jonas')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'observation deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the observation.'
                });
            }
        }
    }
}