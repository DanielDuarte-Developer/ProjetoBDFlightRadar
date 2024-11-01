import { Model } from "../model/model.model";
import { DatabaseService } from "../services/DataBase/DatabaseService";
import { BaseSqlRepository } from "./base/base.sql.repository";
import { IModelRepository } from "./interfaces/repositories/imodel.repository";

export class ModelRepository extends BaseSqlRepository<Model> implements IModelRepository {
    protected dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        super(dbService, '', 'spGetModels')
        this.dbService = dbService;
    }

    ListModels(
        idModel: string, 
        idBrand: string, 
        sitsNumber: string, 
        tare: string, 
        grossWeight: string, 
        payload: number,
        flightCrewMembers: number, 
        fuelQuantity: number, 
        modelYear: number, 
        status: string, 
        sortField: string, 
        sortAscending: boolean): Promise<Model[]> {
        const filters = {
            p_Id : idModel,
            p_IdBrand : idBrand,
            p_SitsNumber :sitsNumber,
            p_Tare : tare,
            p_GrossWeight : grossWeight,
            p_Payload :payload,
            p_FlightCrewNumber : flightCrewMembers,
            p_FuelQuantity : fuelQuantity,
            p_ModelYear : modelYear,
            p_Status: status,
            p_sortField: sortField,
            p_sortAscending: sortAscending
        }
        //Give the procedure name and the parameters
        return this.dbService.callProcedure<Model[]>('spGetModels', filters);
    }
}