import { Airline } from "../model/airline.model";
import { Country } from "../model/country.model";
import { AirlineDTO } from "../model/dto/airline.model.dto";
import { AirlineRepository } from "../repository/airline.repository";
import { CountryRepository } from "../repository/country.repository";
import { IAirlineService } from "./interfaces/iairline.service";

export class AirlineService implements IAirlineService{
    protected airlineRepository: AirlineRepository;
    protected countryRepository: CountryRepository;

    constructor(airlineRepository: AirlineRepository, countryRepository: CountryRepository) {
        this.airlineRepository = airlineRepository;
        this.countryRepository = countryRepository;
    }

    async AddAsync(item: Airline, userId: string) {
        await this.airlineRepository.AddAsync(item,userId);
    }
    
    async UpdateAsync(item: Airline, userId: string) {
        await this.airlineRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.airlineRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: String): Promise<AirlineDTO> {
        const airline: Airline = await this.airlineRepository.GetAsync(id)
        const country: Country = await this.countryRepository.GetAsync(airline.IdCountry);
  
        return {
            Id : airline.Id,
            CountryObj: country,
            AirlineName: airline.AirlineName,
            AirlineCode: airline.AirlineCode
        }
    }

    async ListAsync(
        idAirline: string = '', 
        idCountry: string = '', 
        airlineName: string = '', 
        airlineCode: string = '', 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<AirlineDTO[]> {
        const airlines: Airline[] = await this.airlineRepository.ListArlines(idAirline,idCountry, airlineName,airlineCode,sortField,sortAscending)
                
        const airlineDTOs = await Promise.all(
            airlines.map(async (airline) => {
                const country = await this.countryRepository.GetAsync(airline.IdCountry);
                return {
                    Id: airline.Id,
                    CountryObj: country,
                    AirlineName: airline.AirlineName,
                    AirlineCode: airline.AirlineCode,
                };
            })
        );

        return airlineDTOs
    }
    
}