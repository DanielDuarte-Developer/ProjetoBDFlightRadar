import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { BrandDTO } from "../model/dto/brand.model.dto";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { IBrandService } from "./interfaces/ibrand.service";

export class BrandService implements IBrandService {
  protected brandRepository: BrandRepository;
  protected countryRepository: CountryRepository;

  constructor(
    brandRepository: BrandRepository,
    countryRepository: CountryRepository
  ) {
    this.brandRepository = brandRepository;
    this.countryRepository = countryRepository;
  }

  async AddAsync(item: Brand, userId: string) {
    try {
      await this.brandRepository.AddAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to insert an Brand:", error);
    }
  }

  async UpdateAsync(item: Brand, userId: string) {
    try {
      await this.brandRepository.UpdateAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to update an Brand:", error);
    }
  }

  async DeleteAsync(id: string, userId: string) {
    try {
      await this.brandRepository.DeleteAsync(id, userId);
    } catch (error) {
      throw Error("Error Trying to delete an Brand:", error);
    }
  }

  async GetByIdAsync(id: string): Promise<BrandDTO> {
    try {
      const brand: Brand = await this.brandRepository.GetAsync(id);
      const country: Country = await this.countryRepository.GetAsync(
        brand.IdCountry
      );

      return {
        Id: brand[0].Id,
        CountryObj: { Id: country[0].Id, CountryName: country[0].CountryName },
        BrandName: brand[0].BrandName,
      };
    } catch (error) {
      throw Error("Error Trying to get Brand by id :", error);
    }
  }

  async ListAsync(
    idBrand: string = "",
    idCountry: string = "",
    brandName: string = "",
    sortField: string = "",
    sortAscending: boolean = false
  ): Promise<BrandDTO[]> {
    try {
      const brands: Brand[] = await this.brandRepository.ListBrands(
        idBrand,
        idCountry,
        brandName,
        sortField,
        sortAscending
      );

      const brandDTOs = await Promise.all(
        brands[0].map(async (brand) => {
          const country: Country = await this.countryRepository.GetAsync(
            brand.IdCountry
          );
          return {
            Id: brand.Id,
            CountryObj: {
              Id: country[0].Id,
              CountryName: country[0].CountryName,
            },
            BrandName: brand.BrandName,
          };
        })
      );

      return brandDTOs;
    } catch (error) {
      throw Error("Error Trying to list Brands:", error);
    }
  }
}
