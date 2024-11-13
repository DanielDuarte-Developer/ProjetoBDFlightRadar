import { Handler, Request, Response } from "express";
import { BrandRepository } from "../repository/brand.repository";
import { Brand } from "../model/brand.model";

export class BrandController {
    private brandRepository: BrandRepository;

    constructor(brandRepository: BrandRepository) {
        this.brandRepository = brandRepository;
    }
   
    getBrands(): Handler {
        return async (req: Request, res: Response) => {
            const filters: Brand = req.body
            try {
                // Get the brands by the filters given
                const brands = await this.brandRepository.ListBrands(
                    filters.Id,
                    filters.IdCountry,
                    filters.BrandName)

                // If there is no error, returns a success response
                res.status(200).json(brands)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve brand data.'
                });
            }
        }
    }

    getBrand(): Handler {
        return async (req: Request, res: Response) => {
            const id_brand = req.body
            try {
                // Get brand by id
                const brand = this.brandRepository.GetAsync(id_brand)

                // If there is no error, returns a success response
                res.status(200).json(brand)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve brand data.'
                });
            }
        }
    }

    addBrand(): Handler {
        return async (req: Request, res: Response) => {
            const object: Brand = req.body
            try {
                // Adds a new brand
                await this.brandRepository.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Brand added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new brand.'
                });
            }
        }
    }

    updateBrand(): Handler {
        return async (req: Request, res: Response) => {
            const object: Brand = req.body

            try {
                // Updates the brand
                await this.brandRepository.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Brand updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the brand.'
                });
            }
        }
    }
    deleteBrand(): Handler {
        return async (req: Request, res: Response) => {
            const id_brand = req.body
            try {
                // Deletes the brand
                await this.brandRepository.DeleteAsync(id_brand, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Brand deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the brand.'
                });
            }
        }
    }
}