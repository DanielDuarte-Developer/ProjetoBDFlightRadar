import { Country } from "../model/country.model";
import { CountryDTO } from "../model/dto/country.model.dto";
import { CountryRepository } from "../repository/country.repository";
import { ICountryService } from "./interfaces/icountry.service";

export class CountryService implements ICountryService{
    protected countryRepository : CountryRepository
    
    constructor(countryRepository : CountryRepository){
        this.countryRepository = countryRepository
    }
    async AddAsync(item: Country, userId: string) {
        return await this.countryRepository.AddAsync(item,userId)
    }
    async UpdateAsync(item: Country, userId: string) {
        return await this.countryRepository.UpdateAsync(item,userId)
    }
    async DeleteAsync(id: string, userId: string) {
        return await this.countryRepository.DeleteAsync(id, userId)
    }
    async GetByIdAsync(id: string): Promise<CountryDTO> {
        const country: Country = await this.countryRepository.GetAsync(id);
        
        return{
            Id: country[0].Id,
            CountryName: country[0].CountryName
        }
    }
    async ListAsync(
        idCountry: string = '', 
        countryName: string = '', 
        sortField: string = '', 
        sortAscending: boolean= false): Promise<CountryDTO[]> {
        const countries = await this.countryRepository.ListCountries(idCountry,countryName,sortField,sortAscending)

        const countryDTOs = await Promise.all(
            countries[0].map(async (country) => {
                return{
                    Id: country.Id,
                    CountryName: country.CountryName
                }
            })
        );
        
        return countryDTOs
    }
}