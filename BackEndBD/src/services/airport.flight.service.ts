import { Airline } from "../model/airline.model";
import { Airplane } from "../model/airplane.model";
import { Airport } from "../model/airport.model";
import { AirportFlight } from "../model/airportflight.model";
import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { AirportFlightDTO } from "../model/dto/airport.flight.dto";
import { Flight } from "../model/flight.model";
import { Model } from "../model/model.model";
import { Observation } from "../model/observation.model";
import { AirlineRepository } from "../repository/airline.repository";
import { AirplaneRepository } from "../repository/airplane.repository";
import { AirportFlightRepository } from "../repository/airport.flight.repository";
import { AirportRepository } from "../repository/airport.repository";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { FlightRepository } from "../repository/flight.repository";
import { ModelRepository } from "../repository/model.repository";
import { ObservationRepository } from "../repository/observation.repository";
import { IAirportFlightService } from "./interfaces/iairport.flight.service";

export class AirportFlightService implements IAirportFlightService{
    protected airportFlightRepository: AirportFlightRepository;
    protected airportRepository: AirportRepository;
    protected flightRepository: FlightRepository;
    protected countryRepository: CountryRepository;
    protected observationRepository: ObservationRepository;
    protected airplaneRepository: AirplaneRepository;
    protected modelRepository: ModelRepository;
    protected brandRepository: BrandRepository;
    protected airlineRepository: AirlineRepository;

    constructor(airportFlightRepository: AirportFlightRepository, airportRepository: AirportRepository, 
        flightRepository: FlightRepository, countryRepository: CountryRepository, observationRepository: ObservationRepository,
        airplaneRepository: AirplaneRepository, modelRepository: ModelRepository, brandRepository: BrandRepository, airlineRepository: AirlineRepository) {
        this.airportFlightRepository = airportFlightRepository;
        this.airportRepository = airportRepository;
        this.flightRepository = flightRepository;
        this.countryRepository = countryRepository;
        this.observationRepository = observationRepository;
        this.airplaneRepository = airplaneRepository;
        this.modelRepository = modelRepository;
        this.brandRepository = brandRepository;
        this.airlineRepository = airlineRepository;
    }

    async AddAsync(item: AirportFlight, userId: string) {
        await this.airportFlightRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: AirportFlight, userId: string) {
        await this.airportFlightRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.airportFlightRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<AirportFlightDTO> {
        const airportFlight: AirportFlight = await this.airportFlightRepository.GetAsync(id);
        const airport: Airport = await this.airportRepository.GetAsync(airportFlight[0].IdAirport)
        const countryAirport: Country = await this.countryRepository.GetAsync(airport[0].IdCountry)
        const flight: Flight = await this.flightRepository.GetAsync(airportFlight[0].IdFlight)
        const observation: Observation = await this.observationRepository.GetAsync(flight[0].IdObservation);
        const airplane: Airplane = await this.airplaneRepository.GetAsync(flight[0].IdAirplane);
        const model: Model = await this.modelRepository.GetAsync(airplane[0].IdModel);
        const brand: Brand = await this.brandRepository.GetAsync(model[0].IdBrand);
        const countryBrand: Country = await this.countryRepository.GetAsync(brand[0].IdCountry);
        const airline: Airline = await this.airlineRepository.GetAsync(airplane[0].IdAirline);
        const countryAirline:Country = await this.countryRepository.GetAsync(airline[0].IdCountry)
        
        return {
            Id : airportFlight[0].Id,
            AirportObj: {
                Id : airport[0].Id,
                CountryObj : {Id: countryAirport[0].Id, CountryName: countryAirport[0].CountryName},
                AirportName : airport[0].AirportName,
                AirportCode : airport[0].AirportCode,
                LocationName : airport[0].LocationName,
                LocationLatitude : airport[0].LocationLatitude,
                LocationLongitude: airport[0].LocationLongitude
            },
            FlightObj: {
                Id: flight[0].Id,
                ObservationObj: {Id: observation[0].Id, ObservationText: observation[0].ObservationText},
                AirplaneObj: {
                    Id : airplane[0].Id,
                    ModelObj : { 
                        Id: model[0].Id,
                        BrandObj : {Id: brand[0].Id, CountryObj: {Id: countryBrand[0].Id, CountryName: countryBrand[0].CountryName}, BrandName: brand.BrandName},
                        ModelName: model[0].ModelName,
                        ModelImage: model[0].ModelImage,
                        SitsNumber: model[0].SitsNumber,
                        Tare: model[0].Tare,
                        GrossWeight: model[0].GrossWeight,
                        Payload : model.Payload,
                        FlightCrewNumber : model[0].FlightCrewNumber,
                        FuelQuantity : model[0].FuelQuantity,
                        ModelYear : model[0].ModelYear,
                    },
                    AirlineObj: {
                        Id: airline[0].Id,
                        CountryObj: {Id: countryAirline[0].Id, CountryName: countryAirline[0].CountryName},
                        AirlineName: airline[0].AirlineName,
                        AirlineCode: airline[0].AirlineCode
                    }
                },
                FlightCode: flight[0].FlightCode,
                Passengers: flight[0].Passengers
            },
           TimeMarker: airportFlight[0].TimeMarker
        }
    }

    async ListAsync(
        idAirport: string = '',
        idFlight: string = '',
        timeMarker: string = '',
        sortField: string = '',
        sortAscending: boolean = false): Promise<AirportFlightDTO[]> {
        const airportFlights: AirportFlight[] = await this.airportFlightRepository.ListAirportFlights(idAirport,idFlight,timeMarker,sortField,sortAscending)
        
        const airportFlightDTOs = await Promise.all(
            airportFlights[0].map(async (airportFlight) => {
                const airport: Airport = await this.airportRepository.GetAsync(airportFlight.IdAirport)
                const countryAirport: Country = await this.countryRepository.GetAsync(airport[0].IdCountry)
                const flight: Flight = await this.flightRepository.GetAsync(airportFlight.IdFlight)
                const observation: Observation = await this.observationRepository.GetAsync(flight[0].IdObservation);
                const airplane: Airplane = await this.airplaneRepository.GetAsync(flight[0].IdAirplane);
                const model: Model = await this.modelRepository.GetAsync(airplane[0].IdModel);
                const brand: Brand = await this.brandRepository.GetAsync(model[0].IdBrand);
                const countryBrand: Country = await this.countryRepository.GetAsync(brand[0].IdCountry);
                const airline: Airline = await this.airlineRepository.GetAsync(airplane[0].IdAirline);
                const countryAirline:Country = await this.countryRepository.GetAsync(airline[0].IdCountry)

                return {
                    Id : airportFlight.Id,
                    AirportObj: {
                        Id : airport[0].Id,
                        CountryObj : {Id: countryAirport[0].Id, CountryName: countryAirport[0].CountryName},
                        AirportName : airport[0].AirportName,
                        AirportCode : airport[0].AirportCode,
                        LocationName : airport[0].LocationName,
                        LocationLatitude : airport[0].LocationLatitude,
                        LocationLongitude: airport[0].LocationLongitude
                    },
                    FlightObj: {
                        Id: flight[0].Id,
                        ObservationObj: {Id: observation[0].Id, ObservationText: observation[0].ObservationText},
                        AirplaneObj: {
                            Id : airplane[0].Id,
                            ModelObj : { 
                                Id: model[0].Id,
                                BrandObj : {Id: brand[0].Id, CountryObj: {Id: countryBrand[0].Id, CountryName: countryBrand[0].CountryName}, BrandName: brand[0].BrandName},
                                ModelName: model[0].ModelName,
                                SitsNumber: model[0].SitsNumber,
                                Tare: model[0].Tare,
                                GrossWeight: model[0].GrossWeight,
                                Payload : model.Payload,
                                FlightCrewNumber : model[0].FlightCrewNumber,
                                FuelQuantity : model[0].FuelQuantity,
                                ModelYear : model[0].ModelYear,
                            },
                            AirlineObj: {
                                Id: airline[0].Id,
                                CountryObj: {Id: countryAirline[0].Id, CountryName: countryAirline[0].CountryName},
                                AirlineName: airline[0].AirlineName,
                                AirlineCode: airline[0].AirlineCode
                            }
                        },
                        FlightCode: flight[0].FlightCode,
                        Passengers: flight[0].Passengers
                    },
                   TimeMarker: airportFlight.TimeMarker
                };
            })
        );

        return airportFlightDTOs
    }

}