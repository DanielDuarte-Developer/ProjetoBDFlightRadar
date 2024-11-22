import { Handler, Request, Response } from "express";
import { Brand } from "../model/brand.model";
import { BrandService } from "../services/brand.service";

export class BrandController {
    private brandService: BrandService;

    constructor(brandService: BrandService) {
        this.brandService = brandService;
    }
   
    getBrands(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id: req.query.Id as string,
                IdCountry: req.query.IdCountry as string,
                BrandName: req.query.BrandName as string
            }
            try {
                // Get the brands by the filters given
                const brands = await this.brandService.ListAsync(
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
            const id_brand = req.params.brandId as string
            try {
                // Get brand by id
                const brand = this.brandService.GetByIdAsync(id_brand)

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
                await this.brandService.AddAsync(object, 'daniel')

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
                await this.brandService.UpdateAsync(object, 'daniel')

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
            const id_brand = req.params.brandId as string
            try {
                // Deletes the brand
                await this.brandService.DeleteAsync(id_brand, 'daniel')

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