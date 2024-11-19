import { Airport } from "../model/airport.model";
import { Country } from "../model/country.model";
import { AirportDTO } from "../model/dto/airport.model.dto";
import { AirportRepository } from "../repository/airport.repository";
import { CountryRepository } from "../repository/country.repository";
import { IAirportService } from "./interfaces/iairport.service";

export class AirportService implements IAirportService{
    protected airportRepository: AirportRepository;
    protected countryRepository: CountryRepository;

    constructor(airportRepository: AirportRepository, countryRepository: CountryRepository) {
        this.airportRepository = airportRepository;
        this.countryRepository = countryRepository;
    }

    async AddAsync(item: Airport, userId: string) {
        await this.airportRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Airport, userId: string) {
        await this.airportRepository.UpdateAsync(item, userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.airportRepository.DeleteAsync(id, userId);
    }

    async GetByIdAsync(id: string): Promise<AirportDTO> {
        const airport: Airport = await this.airportRepository.GetAsync(id);
        const country: Country = await this.countryRepository.GetAsync(airport.IdCountry);

        return {
            Id : airport.Id,
            CountryObj : country,
            AirportName : airport.AirportName,
            AirportCode : airport.AirportCode,
            LocationName : airport.LocationName,
            LocationLatitude : airport.LocationLatitude,
            LocationLongitude: airport.LocationLongitude
        }
    }

    async ListAsync(
        idAirport: string = '', 
        idCountry: string = '', 
        airportName: string = '', 
        airportCode: string = '', 
        airportLocationName: string = '', 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<AirportDTO[]> {
        const airports: Airport[] = await this.airportRepository.ListAirports(idAirport,idCountry,airportName,airportCode,airportLocationName,sortField,sortAscending)
        
        const airportDTOs = await Promise.all(
            airports.map(async (airport) => {
                const country: Country = await this.countryRepository.GetAsync(airport.IdCountry);
                return {
                    Id : airport.Id,
                    CountryObj : country,
                    AirportName : airport.AirportName,
                    AirportCode : airport.AirportCode,
                    LocationName : airport.LocationName,
                    LocationLatitude : airport.LocationLatitude,
                    LocationLongitude: airport.LocationLongitude
                }
            })
        );
        
        return airportDTOs
    }
}