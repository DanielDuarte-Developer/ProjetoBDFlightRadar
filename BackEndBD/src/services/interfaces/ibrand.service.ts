import { Brand } from "../../model/brand.model"
import { BrandDTO } from "../../model/dto/brand.model.dto"

export interface IBrandService {
    /**
     * Adds new Brand 
     * 
     * @param item The item to add
     * @param userId The user identifier
     */
    AddAsync(item:Brand, userId: string)

    /**
     * Updates existent Brand
     * 
     * @param item The item to update 
     * @param userId The user identifier
     */
    UpdateAsync(item:Brand, userId: string)

    /**
     * Deletes an existent Brand
     * 
     * @param id The brand identifier
     * @param userId The user identifier
     */
    DeleteAsync(id: string, userId: string)
    
    /**
     * Get brand by id
     * 
     * @param id The identifier
     * 
     * @returns The DTO of brand
     */
    GetByIdAsync(id: string): Promise<BrandDTO>

    /**
     * List the Brands records
     * 
     * @param idBrand The identifier
     * @param idCountry Country identifier
     * @param brandName Brand name
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     * 
     * @returns the DTO of brand
     */
    ListAsync(
        idBrand: string,
        idCountry: string,
        brandName: string,
        sortField: string,
        sortAscending: boolean): Promise<BrandDTO[]>
}