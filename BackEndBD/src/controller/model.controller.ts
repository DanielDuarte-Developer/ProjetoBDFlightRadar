import { Handler, Request, Response } from "express";
import { ModelRepository } from "../repository/model.repository";
import { Model } from "../model/model.model";

export class ModelController {
    private modelRepository: ModelRepository;

    constructor(modelRepository: ModelRepository) {
        this.modelRepository = modelRepository;
    }

    getModels(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Model = req.body
            try {
                // Get the models by the filters given
                const models = await this.modelRepository.ListModels(
                    filters.Id,
                    filters.IdBrand,
                    filters.SitsNumber,
                    filters.Tare,
                    filters.GrossWeight,
                    filters.Payload,
                    filters.FlightCrewMembers,
                    filters.FuelQuantity,
                    filters.ModelYear)

                // If there is no error, returns a success response
                res.status(200).json(models)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve model data.'
                });
            }
        }
    }

    getModel(): Handler {
        return async (req: Request, res: Response) => {
            const id_model = req.body
            try {
                // Get model by id
                const model = await this.modelRepository.GetAsync(id_model)

                // If there is no error, returns a success response
                res.status(200).json(model)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve model data.'
                });
            }
        }
    }

    addModel(): Handler {
        return async (req: Request, res: Response) => {
            const object: Model = req.body
            try {
                // Adds a new model
                await this.modelRepository.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Model added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new model.'
                });
            }
        }
    }

    updateModel(): Handler {
        return async (req: Request, res: Response) => {
            const object: Model = req.body

            try {
                // Updates the model
                await this.modelRepository.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Model updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the model.'
                });
            }
        }
    }
    deleteModel(): Handler {
        return async (req: Request, res: Response) => {
            const id_model = req.body
            try {
                // Deletes the model
                await this.modelRepository.DeleteAsync(id_model, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'model deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the model.'
                });
            }
        }
    }
}