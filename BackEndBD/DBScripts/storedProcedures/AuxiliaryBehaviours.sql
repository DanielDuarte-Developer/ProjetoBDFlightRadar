use flight_radar;

DELIMITER $$
create function randomFlightObservation()
returns varchar
begin

declare observationsNumber int; 
declare observationId varchar(100);

select count(*) into observationsNumber from observation;
select IdObservation into observationId from observation where IdObservation = rand(@observationsNumber);

return observationId;
end $$
create function getDepartureAirport(flightId varchar(100))
returns varchar(100)
begin
    SET @airportId :=(select IdAirport from airport_flight where IdAirport = flightId order by TimeMarker asc limit 1);
return @airportId;    
end $$

create function getArrivalAirport(flightId varchar(100))
returns varchar(100)
begin
    SET @airportId :=(select IdAirport from airport_flight where IdAirport = flightId order by TimeMarker desc limit 1);
return @airportId;    
end $$

create function getStopOversAirport(flightId varchar(100))
returns varchar(100)
begin
    SET @airportId :=(select IdAirport from airport_flight where IdAirport = flightId and TimeMarker > (select TimeMarker from airport_flight order by TimeMarker asc limit 1) and TimeMarker < (select TimeMarker from airport_flight order by TimeMarker desc limit 1));
return @airportId;    
end $$

create function getDepartureTimeMarker(flightId varchar(100))
returns timestamp
begin
    SET @timeMarker :=(select TimeMarker from airport_flight where TimeMarker = timeMarker order by TimeMarker asc limit 1);
return @timeMarker;    
end $$

create function getArrivalTimeMarker(flightId varchar(100))
returns timestamp
begin
    SET @timeMarker :=(select TimeMarker from airport_flight where TimeMarker = timeMarker order by TimeMarker desc limit 1);
return @timeMarker;    
end $$

create function getStopOversTimeMarker(flightId varchar(100))
returns timestamp
begin
    SET @timeMarkers :=(select TimeMarker from airport_flight where TimeMarker > (select TimeMarker from airport_flight order by TimeMarker asc limit 1) and TimeMarker < (select TimeMarker from airport_flight order by TimeMarker desc limit 1);
return @timeMarkers;    
end $$

create procedure getDeparture(flightId varchar(100))
begin
    select IdAirport, TimeMarker from airport_flight where IdFlight = flightId order by TimeMarker asc limit 1;
end $$

create procedure getArrival(flightId varchar(100))
begin
    select IdAirport, TimeMarker from airport_flight where IdFlight = flightId order by TimeMarker desc limit 1;
end $$

create procedure getStopOvers(flightId varchar(100))
begin
    select IdAirport, TimeMarker from airport_flight where IdFlight = flightId and TimeMarker > (select TimeMarker from airport_flight order by TimeMarker asc limit 1) and TimeMarker < (select TimeMarker from airport_flight order by TimeMarker desc limit 1);
end $$

create procedure getMapPlaneValues()
begin
    declare flightId varchar(100)
    declare done int default false;
    declare continue handler for not found set done = true;

    declare cursor flightIds for 
    
    select IdFlight from flight;
    open flightIds;
    read_loop : loop
        fetch flightIds into flightId;
        if done then leave read_loop;
        end if;
        call getDeparture(flightId);
        declare departure
        call getArrival(flightId);
        call getStopOvers(flightId);
    end loop;
    create view getMapPlaneValues as select IdFlight, 

end $$

DELIMITER ;
