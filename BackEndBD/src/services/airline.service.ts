import { Airline } from "../model/airline.model";
import { Country } from "../model/country.model";
import { AirlineDTO } from "../model/dto/airline.model.dto";
import { CountryDTO } from "../model/dto/country.model.dto";
import { AirlineRepository } from "../repository/airline.repository";
import { CountryRepository } from "../repository/country.repository";
import { IAirlineService } from "./interfaces/iairline.service";

export class AirlineService implements IAirlineService {
  protected airlineRepository: AirlineRepository;
  protected countryRepository: CountryRepository;

  constructor(
    airlineRepository: AirlineRepository,
    countryRepository: CountryRepository
  ) {
    this.airlineRepository = airlineRepository;
    this.countryRepository = countryRepository;
  }

  async AddAsync(item: Airline, userId: string) {
    try {
      await this.airlineRepository.AddAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to insert an Airline:", error);
    }
  }

  async UpdateAsync(item: Airline, userId: string) {
    try {
      await this.airlineRepository.UpdateAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to update an Airline:", error);
    }
  }

  async DeleteAsync(id: string, userId: string) {
    try {
      await this.airlineRepository.DeleteAsync(id, userId);
    } catch (error) {
      throw new Error("Error trying to delete Airline:", error);
    }
  }

  async GetByIdAsync(id: String): Promise<AirlineDTO> {
    try {
      const airline: Airline = await this.airlineRepository.GetAsync(id);
      const country: Country = await this.countryRepository.GetAsync(
        airline[0].IdCountry
      );
      return {
        Id: airline[0].Id,
        CountryObj: { Id: country[0].Id, CountryName: country[0].CountryName },
        AirlineName: airline[0].AirlineName,
        AirlineCode: airline[0].AirlineCode,
      };
    } catch (error) {
      throw Error("Error Trying to get Airline data by id:", error);
    }
  }

  async ListAsync(
    idAirline: string = "",
    idCountry: string = "",
    airlineName: string = "",
    airlineCode: string = "",
    sortField: string = "",
    sortAscending: boolean = false
  ): Promise<AirlineDTO[]> {
    try {
      const airlines: Airline[] = await this.airlineRepository.ListArlines(
        idAirline,
        idCountry,
        airlineName,
        airlineCode,
        sortField,
        sortAscending
      );

      const airlineDTOs = await Promise.all(
        airlines[0].map(async (airline) => {
          const country = await this.countryRepository.GetAsync(
            airline.IdCountry
          );

          return {
            Id: airline.Id,
            CountryObj: {
              Id: country[0].Id,
              CountryName: country[0].CountryName,
            },
            AirlineName: airline.AirlineName,
            AirlineCode: airline.AirlineCode,
          };
        })
      );
      return airlineDTOs;
    } catch (error) {
      throw new Error("Error trying to list Airlines:", error);
    }
  }
}
