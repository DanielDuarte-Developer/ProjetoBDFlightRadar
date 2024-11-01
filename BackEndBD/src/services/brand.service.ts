import { Brand } from "../model/brand.model";
import { BrandRepository } from "../repository/brand.repository";
import { IBrandService } from "./interfaces/ibrand.service";

export class BrandService implements IBrandService{
    protected brandRepository : BrandRepository
    
    constructor(brandRepository: BrandRepository){
        this.brandRepository  = brandRepository ;
    }

    AddAsync(brand: Brand, userId: string): Promise<Brand> {
        //TODO
        throw new Error("Method not implemented.");
    }

    UpdateAsync(brand: Brand, id: string, userId: string): Promise<Brand> {
        //TODO
        throw new Error("Method not implemented.");
    }

    DeleteAsync(id: string, userId: string): Promise<boolean> {
        //TODO
        throw new Error("Method not implemented.");
    }

    GetByIdAsync(id: string): Promise<Brand> {
        //TODO
        throw new Error("Method not implemented.");
    }

    ListBrands(idBrand: string, idCountry: string, brandName: string, status: string, sortField: string, sortAscending: boolean): Promise<Brand[]> {
        //TODO
        throw new Error("Method not implemented.");
    }
}