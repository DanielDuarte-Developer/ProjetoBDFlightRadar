import { Brand } from "../model/brand.model";
import { DatabaseService } from "../services/DatabaseService";

export class BrandRepository {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    async getAirports(params:Brand[]): Promise<Brand[]> {
        //Give the procedure name and the parameters if necessary
        return this.dbService.callProcedure<Brand[]>('spGetBrands', params);
    }

}