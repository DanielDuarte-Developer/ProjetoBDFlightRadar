export class AirportAirplaneFlightController {
    private airplaneRepository: AirplaneRepository;

    constructor(airplaneRepository: AirplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }
   
}