import { Model } from "../model/model.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IModelRepository } from "./interfaces/repositories/imodel.repository";

export class ModelRepository extends BaseSqlRepository<Model> implements IModelRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, 'spInsertUpdateDeleteModel', 'spGetModels')
        this.dbService = dbService;
    }

    async ListModels(
        idModel: string = '', 
        idBrand: string = '', 
        sitsNumber: string = '', 
        tare: string = '', 
        grossWeight: string = '', 
        payload: number = 0,
        flightCrewMembers: number = 0, 
        fuelQuantity: number = 0, 
        modelYear: number = 0, 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<Model[]> {
            try{
                const procedureParams = await this.dbService.getProcedureParams('spGetModels');
        
                const filters = this.dbService.constructParams(procedureParams,{
                    p_Id : idModel || null,
                    p_IdBrand : idBrand || null,
                    p_SitsNumber :sitsNumber || null,
                    p_Tare : tare || null,
                    p_GrossWeight : grossWeight || null,
                    p_Payload :payload || null,
                    p_FlightCrewNumber : flightCrewMembers || null,
                    p_FuelQuantity : fuelQuantity || null,
                    p_ModelYear : modelYear || null,
                    p_sortField : sortField || null,
                    p_sortAscending: sortAscending ? 'ASC': 'DESC',
                })
                //Give the procedure name and the parameters
                return this.dbService.callProcedure<Model[]>('spGetModels', filters);
            }catch(error){
                throw new Error("Error trying to list Models",error)
            }
    }
}