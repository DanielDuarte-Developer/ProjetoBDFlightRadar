import { Handler, Request, Response } from "express";
import { Country } from "../model/country.model";
import { CountryService } from "../services/country.service";

export class CountryController {
    private countryService: CountryService;

    constructor(countryRepository: CountryService) {
        this.countryService = countryRepository;
    }

    getCountries(): Handler {
        return async (req: Request, res: Response) => {
            const filters = {
                Id : req.query.Id as string,
                CountryName: req.query.CountryName as string
            }
            
            try {
                // Get the countries by the filters given
                const countries = await this.countryService.ListAsync(
                    filters.Id,
                    filters.CountryName)

                // If there is no error, returns a success response
                res.status(200).json(countries)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve brand data.'
                });
            }
        }
    }

    getCountry(): Handler {
        return async (req: Request, res: Response) => {
            const id_country = req.params.countryId as string
            try {
                // Get country by id
                const country = await this.countryService.GetByIdAsync(id_country)

                // If there is no error, returns a success response
                res.status(200).json(country)
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to retrieve country data.'
                });
            }
        }
    }

    addCountry(): Handler {
        return async (req: Request, res: Response) => {
            const object: Country = req.body
            try {
                // Adds a new country
                await this.countryService.AddAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(201).json({
                    success: true,
                    message: 'Country added successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to add new country.'
                });
            }
        }
    }

    updateCountry(): Handler {
        return async (req: Request, res: Response) => {
            const object: Country = req.body

            try {
                // Updates the country
                await this.countryService.UpdateAsync(object, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Country updated successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to update the country.'
                });
            }
        }
    }
    deleteCountry(): Handler {
        return async (req: Request, res: Response) => {
            const id_country = req.params.countryId as string
            try {
                // Deletes the country
                await this.countryService.DeleteAsync(id_country, 'daniel')

                // If there is no error, returns a success response
                res.status(200).json({
                    success: true,
                    message: 'Country deleted successfully.'
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to delete the country.'
                });
            }
        }
    }
}