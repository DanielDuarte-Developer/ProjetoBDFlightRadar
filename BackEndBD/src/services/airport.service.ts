import { Airport } from "../model/airport.model";
import { Country } from "../model/country.model";
import { AirportDTO } from "../model/dto/airport.model.dto";
import { AirportRepository } from "../repository/airport.repository";
import { CountryRepository } from "../repository/country.repository";
import { IAirportService } from "./interfaces/iairport.service";

export class AirportService implements IAirportService {
  protected airportRepository: AirportRepository;
  protected countryRepository: CountryRepository;

  constructor(
    airportRepository: AirportRepository,
    countryRepository: CountryRepository
  ) {
    this.airportRepository = airportRepository;
    this.countryRepository = countryRepository;
  }

  async AddAsync(item: Airport, userId: string) {
    try {
      await this.airportRepository.AddAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to  an Airport:", error);
    }
  }

  async UpdateAsync(item: Airport, userId: string) {
    try {
      await this.airportRepository.UpdateAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to update an Airport:", error);
    }
  }

  async DeleteAsync(id: string, userId: string) {
    try {
      await this.airportRepository.DeleteAsync(id, userId);
    } catch (error) {
      throw Error("Error Trying to delete an Airport:", error);
    }
  }

  async GetByIdAsync(id: string): Promise<AirportDTO> {
    try {
      const airport: Airport = await this.airportRepository.GetAsync(id);
      const country: Country = await this.countryRepository.GetAsync(
        airport[0].IdCountry
      );

      return {
        Id: airport[0].Id,
        CountryObj: { Id: country[0].Id, CountryName: country[0].CountryName },
        AirportName: airport[0].AirportName,
        AirportCode: airport[0].AirportCode,
        LocationName: airport[0].LocationName,
        LocationLatitude: airport[0].LocationLatitude,
        LocationLongitude: airport[0].LocationLongitude,
      };
    } catch (error) {
      throw Error("Error Trying to get Airport by id:", error);
    }
  }

  async ListAsync(
    idAirport: string = "",
    idCountry: string = "",
    airportName: string = "",
    airportCode: string = "",
    airportLocationName: string = "",
    sortField: string = "",
    sortAscending: boolean = false
  ): Promise<AirportDTO[]> {
    try {
      const airports: Airport[] = await this.airportRepository.ListAirports(
        idAirport,
        idCountry,
        airportName,
        airportCode,
        airportLocationName,
        sortField,
        sortAscending
      );

      const airportDTOs = await Promise.all(
        airports[0].map(async (airport) => {
          const country: Country = await this.countryRepository.GetAsync(
            airport.IdCountry
          );
          return {
            Id: airport.Id,
            CountryObj: {
              Id: country[0].Id,
              CountryName: country[0].CountryName,
            },
            AirportName: airport.AirportName,
            AirportCode: airport.AirportCode,
            LocationName: airport.LocationName,
            LocationLatitude: airport.LocationLatitude,
            LocationLongitude: airport.LocationLongitude,
          };
        })
      );

      return airportDTOs;
    } catch (error) {
      throw Error("Error Trying to list Airports:", error);
    }
  }
}
