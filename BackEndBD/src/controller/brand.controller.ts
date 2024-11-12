import { Handler, Request, Response } from "express";
import { BrandRepository } from "../repository/brand.repository";

export class BrandController {
    private brandRepository: BrandRepository;

    constructor(brandRepository: BrandRepository) {
        this.brandRepository = brandRepository;
    }
   
    getBrands(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(200).json()
        }
    }
    addUpdateOrDeleteBrand(): Handler {
        return async (req: Request, res: Response) => {
            //TODO
            //res.status(201).json()
        }
    }
}