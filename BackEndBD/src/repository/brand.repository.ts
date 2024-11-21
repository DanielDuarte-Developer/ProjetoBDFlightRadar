import { Brand } from "../model/brand.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IBrandRepository } from "./interfaces/repositories/ibrand.repository";

export class BrandRepository extends BaseSqlRepository<Brand> implements IBrandRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteBrand', 'spGetBrands')
        this.dbService = dbService;
    }

    async ListBrands(
        idBrand: string = '',
        idCountry: string = '',
        brandName: string = '',
        sortField: string = '',
        sortAscending: boolean = false): Promise<Brand[]> {

        const procedureParams = await this.dbService.getProcedureParams('spGetBrands');

        const filters = this.dbService.constructParams(procedureParams, {
            p_Id: idBrand || null,
            p_IdCountry: idCountry || null,
            p_BrandName: brandName || null,
            p_sortField: sortField || null,
            p_sortAscending: sortAscending ? 'ASC' : 'DESC',
        })
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Brand[]>('spGetBrands', filters);
    }
}