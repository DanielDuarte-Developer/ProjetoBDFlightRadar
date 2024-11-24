use flight_radar;

DELIMITER $$
create function randomFlightObservation()
returns varchar(100)
begin

declare observationsNumber int; 
declare observationId varchar(100);

select IdObservation into observationId from observation order by rand() limit 1;

return observationId;
end $$

create procedure getDeparture(in flightId varchar(100), out airportId varchar(100), out timeMarker timestamp)
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
    set flightId = '';
    set startLat = 0; 
    set startLong = 0; 
    set endLat = 0; 
    set endLong = 0;
    declare cursor cursorFlightIds for select IdFlight from flight;
	declare continue handler for not found set done = true;

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

DELIMITER ;
