import { Handler, Request, Response } from "express";
import { ModelRepository } from "../repository/model.repository";

export class ModelController {
    private modelRepository: ModelRepository;

    constructor(modelRepository: ModelRepository) {
        this.modelRepository = modelRepository;
    }
   
    getModels(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteModel(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
}