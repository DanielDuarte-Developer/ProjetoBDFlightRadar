import { Country } from "../model/country.model";
import { CountryRepository } from "../repository/country.repository";
import { ICountryService } from "./interfaces/icountry.service";

export class CountryService implements ICountryService{
    protected countryRepository : CountryRepository
    
    constructor(brandRepository: CountryRepository){
        this.countryRepository  = brandRepository ;
    }

    AddAsync(country: Country, userId: string): Promise<Country> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(country: Country, id: string, userId: string): Promise<Country> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Country> {
        //TODO
        throw new Error("Method not implemented.");
    }

    ListCountries(idCountry: string, countryName: string, status: string, sortField: string, sortAscending: boolean): Promise<Country[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}