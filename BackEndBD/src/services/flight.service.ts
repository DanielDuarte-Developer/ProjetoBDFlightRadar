import { Airplane } from "../model/airplane.model";
import { FlightDTO } from "../model/dto/flight.model.dto";
import { Flight } from "../model/flight.model";
import { Observation } from "../model/observation.model";
import { AirplaneRepository } from "../repository/airplane.repository";
import { FlightRepository } from "../repository/flight.repository";
import { ObservationRepository } from "../repository/observation.repository";
import { IFlightService } from "./interfaces/iflight.service";

export class FlightService implements IFlightService{
    protected flightRepository: FlightRepository;
    protected observationRepository: ObservationRepository;
    protected airplaneRepository: AirplaneRepository;

    constructor(flightRepository: FlightRepository, observationRepository: ObservationRepository, airplaneRepository: AirplaneRepository) {
        this.flightRepository = flightRepository;
        this.observationRepository = observationRepository;
        this.airplaneRepository = airplaneRepository;
    }

    async AddAsync(item: Flight, userId: string) {
        await this.flightRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Flight, userId: string) {
        await this.flightRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.flightRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<FlightDTO> {
        const flight: Flight = await this.flightRepository.GetAsync(id);
        const observation: Observation = await this.observationRepository.GetAsync(flight.IdObservation);
        const airplane: Airplane = await this.airplaneRepository.GetAsync(flight.IdAirplane);

        return {
            Id: flight.Id,
            ObservationObj: observation,
            AirplaneObj: airplane,
            FlightCode: flight.FlightCode,
            Passengers: flight.Passengers
        }
    }

    async ListAsync(
        idFlight: string = '', 
        idObservation: string = '', 
        idAirplane: string = '', 
        flightCode: string = '', 
        passengers: number = 0, 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<FlightDTO[]> {
        const flights: Flight[] = await this.flightRepository.ListFlights(idFlight,idObservation,idAirplane,flightCode,passengers,sortField,sortAscending)

        const flightDTOs = await Promise.all(
            flights.map(async (flight) => {
                const observation: Observation = await this.observationRepository.GetAsync(flight.IdObservation);
                const airplane: Airplane = await this.airplaneRepository.GetAsync(flight.IdAirplane);
                return {
                    Id: flight.Id,
                    ObservationObj: observation,
                    AirplaneObj: airplane,
                    FlightCode: flight.FlightCode,
                    Passengers: flight.Passengers
                }
            })
        );

        return flightDTOs
    }
}