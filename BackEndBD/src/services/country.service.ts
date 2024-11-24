import { Country } from "../model/country.model";
import { CountryDTO } from "../model/dto/country.model.dto";
import { CountryRepository } from "../repository/country.repository";
import { ICountryService } from "./interfaces/icountry.service";

export class CountryService implements ICountryService {
  protected countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }
  async AddAsync(item: Country, userId: string) {
    try {
      return await this.countryRepository.AddAsync(item, userId);
    } catch (error) {
      throw new Error("Error trying to insert an Country", error);
    }
  }
  async UpdateAsync(item: Country, userId: string) {
    try {
      return await this.countryRepository.UpdateAsync(item, userId);
    } catch (error) {
      throw new Error("Error trying to update an Country", error);
    }
  }
  async DeleteAsync(id: string, userId: string) {
    try {
      return await this.countryRepository.DeleteAsync(id, userId);
    } catch (error) {
      throw new Error("Error trying to delete an Country", error);
    }
  }
  async GetByIdAsync(id: string): Promise<CountryDTO> {
    try {
      const country: Country = await this.countryRepository.GetAsync(id);

      return {
        Id: country[0].Id,
        CountryName: country[0].CountryName,
      };
    } catch (error) {
      throw new Error("Error trying to get Country By Id", error);
    }
  }
  async ListAsync(
    idCountry: string = "",
    countryName: string = "",
    sortField: string = "",
    sortAscending: boolean = false
  ): Promise<CountryDTO[]> {
    try {
      const countries = await this.countryRepository.ListCountries(
        idCountry,
        countryName,
        sortField,
        sortAscending
      );

      const countryDTOs = await Promise.all(
        countries[0].map(async (country) => {
          return {
            Id: country.Id,
            CountryName: country.CountryName,
          };
        })
      );

      return countryDTOs;
    } catch (error) {
      throw new Error("Error trying to list Countrys", error);
    }
  }
}
