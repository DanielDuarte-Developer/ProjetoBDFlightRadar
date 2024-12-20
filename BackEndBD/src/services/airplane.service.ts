import { Airline } from "../model/airline.model";
import { Airplane } from "../model/airplane.model";
import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { AirplaneDTO } from "../model/dto/airplane.model.dto";
import { Model } from "../model/model.model";
import { AirlineRepository } from "../repository/airline.repository";
import { AirplaneRepository } from "../repository/airplane.repository";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { ModelRepository } from "../repository/model.repository";
import { IAirplaneService } from "./interfaces/iairplane.service";

export class AirplaneService implements IAirplaneService {
  protected airplaneRepository: AirplaneRepository;
  protected modelRepository: ModelRepository;
  protected airlineRepository: AirlineRepository;
  protected brandRepository: BrandRepository;
  protected countryRepository: CountryRepository;

  constructor(
    airplaneRepository: AirplaneRepository,
    modelRepository: ModelRepository,
    airlineRepository: AirlineRepository,
    brandRepository: BrandRepository,
    countryRepository: CountryRepository
  ) {
    this.airplaneRepository = airplaneRepository;
    this.modelRepository = modelRepository;
    this.airlineRepository = airlineRepository;
    this.brandRepository = brandRepository;
    this.countryRepository = countryRepository;
  }

  async AddAsync(item: Airplane, userId: string) {
    try {
      await this.airplaneRepository.AddAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to insert an Airplane:", error);
    }
  }

  async UpdateAsync(item: Airplane, userId: string) {
    try {
      await this.airplaneRepository.UpdateAsync(item, userId);
    } catch (error) {
      throw Error("Error Trying to update an Airplane:", error);
    }
  }

  async DeleteAsync(id: string, userId: string) {
    try {
      await this.airplaneRepository.DeleteAsync(id, userId);
    } catch (error) {
      throw Error("Error Trying to delete an Airplane:", error);
    }
  }

  async GetByIdAsync(id: string): Promise<AirplaneDTO> {
    try {
      const airplane: Airplane = await this.airplaneRepository.GetAsync(id);
      const model: Model = await this.modelRepository.GetAsync(
        airplane[0].IdModel
      );
      const brand: Brand = await this.brandRepository.GetAsync(
        model[0].IdBrand
      );
      const country: Country = await this.countryRepository.GetAsync(
        brand[0].IdCountry
      );
      const airline: Airline = await this.airlineRepository.GetAsync(
        airplane.IdAirline
      );

      return {
        Id: airplane[0].Id,
        ModelObj: {
          Id: model[0].Id,
          BrandObj: {
            Id: brand[0].Id,
            CountryObj: {
              Id: country[0].Id,
              CountryName: country[0].CountryName,
            },
            BrandName: brand[0].BrandName,
          },
          ModelName: model[0].ModelName,
          ModelImage: model[0].ModelImage,
          SitsNumber: model[0].SitsNumber,
          Tare: model[0].Tare,
          GrossWeight: model[0].GrossWeight,
          Payload: model.Payload,
          FlightCrewNumber: model[0].FlightCrewNumber,
          FuelQuantity: model[0].FuelQuantity,
          ModelYear: model[0].ModelYear,
        },
        AirlineObj: {
          Id: airline[0].Id,
          CountryObj: {
            Id: country[0].Id,
            CountryName: country[0].CountryName,
          },
          AirlineName: airline[0].AirlineName,
          AirlineCode: airline[0].AirlineCode,
        },
      };
    } catch (error) {
      throw Error("Error Trying to get Airplane by id:", error);
    }
  }

  async ListAsync(
    idAirplane: string = "",
    idModel: string = "",
    idArline: string = "",
    sortField: string = "",
    sortAscending: boolean = false
  ): Promise<AirplaneDTO[]> {
    try {
      const airplanes: Airplane[] = await this.airplaneRepository.ListAirplanes(
        idAirplane,
        idModel,
        idArline,
        sortField,
        sortAscending
      );

      const airplaneDTOs = await Promise.all(
        airplanes[0].map(async (airplane) => {
          const model: Model = await this.modelRepository.GetAsync(
            airplane.IdModel
          );
          const brand: Brand = await this.brandRepository.GetAsync(
            model[0].IdBrand
          );
          const country: Country = await this.countryRepository.GetAsync(
            brand[0].IdCountry
          );
          const airline: Airline = await this.airlineRepository.GetAsync(
            airplane.IdAirline
          );

          return {
            Id: airplane.Id,
            ModelObj: {
              Id: model[0].Id,
              BrandObj: {
                Id: brand[0].Id,
                CountryObj: {
                  Id: country[0].Id,
                  CountryName: country[0].CountryName,
                },
                BrandName: brand[0].BrandName,
              },
              ModelName: model[0].ModelName,
              SitsNumber: model[0].SitsNumber,
              Tare: model[0].Tare,
              GrossWeight: model[0].GrossWeight,
              Payload: model.Payload,
              FlightCrewNumber: model[0].FlightCrewNumber,
              FuelQuantity: model[0].FuelQuantity,
              ModelYear: model[0].ModelYear,
            },
            AirlineObj: {
              Id: airline[0].Id,
              CountryObj: {
                Id: country[0].Id,
                CountryName: country[0].CountryName,
              },
              AirlineName: airline[0].AirlineName,
              AirlineCode: airline[0].AirlineCode,
            },
          };
        })
      );

      return airplaneDTOs;
    } catch (error) {
      throw Error("Error Trying to list Airplanes:", error);
    }
  }
}
