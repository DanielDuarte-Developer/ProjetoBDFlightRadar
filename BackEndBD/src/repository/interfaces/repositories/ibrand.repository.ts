import { Brand } from "../../../model/brand.model";

export interface IBrandRepository {
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