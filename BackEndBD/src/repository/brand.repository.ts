import { Brand } from "../model/brand.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IBrandRepository } from "./interfaces/repositories/ibrand.repository";

export class BrandRepository extends BaseSqlRepository<Brand> implements IBrandRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, '', 'spGetBrands')
        this.dbService = dbService;
    }

    ListBrands(
        idBrand: string,
        idCountry: string,
        brandName: string,
        status: string,
        sortField: string,
        sortAscending: boolean): Promise<Brand[]> {
        const filters = {
            p_Id: idBrand,
            p_IdCountry: idCountry,
            p_BrandName: brandName,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Brand[]>('spGetBrands', filters);
    }
}