import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { BrandDTO } from "../model/dto/brand.model.dto";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { IBrandService } from "./interfaces/ibrand.service";

export class BrandService implements IBrandService{
    protected brandRepository: BrandRepository;
    protected countryRepository: CountryRepository;

    constructor(brandRepository: BrandRepository, countryRepository: CountryRepository) {
        this.brandRepository = brandRepository;
        this.countryRepository = countryRepository;
    }

    async AddAsync(item: Brand, userId: string) {
        await this.brandRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Brand, userId: string) {
        await this.brandRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.brandRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<BrandDTO> {
        const brand: Brand = await this.brandRepository.GetAsync(id);
        const country: Country = await this.countryRepository.GetAsync(brand.IdCountry);

        return {
            Id: brand.Id,
            CountryObj: country,
            BrandName: brand.BrandName
        }
    }

    async ListAsync(
        idBrand: string = '', 
        idCountry: string = '', 
        brandName: string = '',
        sortField: string = '', 
        sortAscending: boolean = false): Promise<BrandDTO[]> {
        const brands: Brand[] = await this.brandRepository.ListBrands(idBrand,idCountry,brandName,sortField,sortAscending);

        const brandDTOs = await Promise.all(
        brands.map(async (brand) => {
                const country: Country = await this.countryRepository.GetAsync(brand.IdCountry);
                return {
                    Id: brand.Id,
                    CountryObj: country,
                    BrandName: brand.BrandName
                }
            })
        );
        
        return brandDTOs
    }
}