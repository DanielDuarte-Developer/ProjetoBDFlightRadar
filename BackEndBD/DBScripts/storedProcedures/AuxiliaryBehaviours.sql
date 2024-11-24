use flight_radar;

SET GLOBAL log_bin_trust_function_creators = 1;
DELIMITER $$
create function randomFlightObservation()
returns varchar(100)
begin

declare observationsNumber int; 
declare observationId varchar(100);

select IdObservation into observationId from observation order by rand() limit 1;

return observationId;
end $$

create procedure getDeparture(inout flightId varchar(100), out airportId varchar(100), out timeMarker timestamp)
begin
    select IdAirport, TimeMarker into airportId, timeMarker from airport_flight where IdFlight = flightId order by TimeMarker asc limit 1;
end $$

create procedure getArrival(flightId varchar(100), out airportId varchar(100), out timeMarker timestamp)
begin
    select IdAirport, TimeMarker into airportId, timeMarker from airport_flight where IdFlight = flightId order by TimeMarker desc limit 1;
end $$

create procedure getStopOvers(flightId varchar(100), out airportId varchar(100), out timeMarker timestamp)
begin
    select IdAirport, TimeMarker into airportId, timeMarker from airport_flight where IdFlight = flightId and TimeMarker > (select TimeMarker from airport_flight order by TimeMarker asc limit 1) and TimeMarker < (select TimeMarker from airport_flight order by TimeMarker desc limit 1);
end $$

create procedure getMapPlaneValues(out flightId varchar(100), out startLat int, out startLong int, out endLat int, out endLong int)
begin
    declare done int default false;
	declare airportId varchar(100);
    declare timeMarker timestamp;
    declare cursorFlightIds cursor for select IdFlight from flight;
	declare continue handler for not found set done = true;
    
	set flightId = '';
    set startLat = 0; 
    set startLong = 0; 
    set endLat = 0; 
    set endLong = 0;
    open cursorFlightIds;
    
    read_loop : loop
        fetch cursorFlightIds into flightId;
        if done then leave read_loop;
        end if;
        
        call getDeparture(flightId, airportId, timeMarker);
        select LocationLatitude, LocationLongitude into startLat, startLong from airport where IdAirport = airportId;
       
		call getArrival(flightId, airportId, timeMarker);
        select LocationLatitude, LocationLongitude into endLat, endLong from airport where IdAirport = airportId;
    end loop;
    close cursorFlightIds;
end $$

create procedure getFlightCardInfo(inout flightId varchar(100), out flightCode char(7), out passengers int,
out startTime timestamp, out endTime timestamp,
out startAirportName nvarchar(100), out startAirportCode char(3), out startLocation nvarchar(50), out startCountry nvarchar(100),
out endAirportName nvarchar(100), out endAirportCode char(3), out endLocation nvarchar(50), out endCountry nvarchar(100),
out airplaneBrandName nvarchar(100), out airplaneModelName nvarchar(100), out airPlaneModelImage varchar(1000),
out airlineName nvarchar(100), out flightDuration time)

begin
declare airplaneId varchar(100);
declare airplaneModelId varchar(100);
declare airplaneBrandId varchar(100);
declare airlineId varchar(100);
declare startCountryId varchar(100);
declare endCountryId varchar(100);
declare startAirportId varchar(100);
declare endAirportId varchar(100);

select Id, IdAirplane, FlightCode, Passengers into flightId, airplaneId, flightCode, passengers from flight;

select IdModel, IdAirline into airplaneModelId, airlineId from airplane where Id = airplaneId;

select IdBrand, ModelName, ModelImage into airplaneBrandId, airplaneModelName, airPlaneModelImage from model where Id = modelId;

select BrandName into airplaneBrandName from brand where Id = brandId;

select AirlineName into airlineName from airline where Id = airlineId;

select CountryName into countryId from country where Id = countryId;

call getDeparture(flightId, startAirportId, startTime);
call getArrival(flightId, endAirportId, endTime);

select IdCountry, AirportName, AirportCode, LocationName into startCountryId, startAirportName, startAirportCode, startLocation from airport where Id = startAirportId;
select IdCountry, AirportName, AirportCode, LocationName into endCountryId, endAirportName, endAirportCode, endLocation from airport where Id = endAirportId;

select CountryName into startCountry from country where Id = startCountryId; 
select CountryName into endCountry from country where Id = endAirportId; 

set flightDuration = timediff(endTime,startTime);

end $$

DELIMITER ;
