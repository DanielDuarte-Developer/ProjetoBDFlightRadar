import { Brand } from "../../model/brand.model";

export interface IBrandService {
    /**
     * Adds a new brand
     * 
     * @param brand The object
     * @param userId The user identifier
     * 
     * @returns The add brand
     */
    AddAsync(brand: Brand, userId: string): Promise<Brand>

    /**
     * Updates a existent brand
     * 
     * @param brand The object
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns The updated brand
     */
    UpdateAsync(brand: Brand, id: string, userId: string): Promise<Brand>

    /**
     * Delete a existent brand
     * 
     * @param id The identifier
     * @param userId The user identifier
     * 
     * @returns No content if brand was deleted, error otherwise.
     */
    DeleteAsync(id: string, userId: string): Promise<boolean>

    /**
     * Get the brand by id
     * 
     * @param id The identifier
     * 
     * @returns The brand
     */
    GetByIdAsync(id: string): Promise<Brand>

    /**
     * List the Brands records
     * 
     * @param idBrand The identifier
     * @param idCountry Country identifier
     * @param brandName Brand name
     * @param status Registry Status
     * @param sortField Organize the data by sortField
     * @param sortAscending Organize ASC or DESC
     */
    ListBrands(
        idBrand: string,
        idCountry: string,
        brandName: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Brand[]>
}