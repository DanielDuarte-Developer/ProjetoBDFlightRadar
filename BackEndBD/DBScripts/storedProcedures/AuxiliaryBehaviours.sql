use flight_radar;

DELIMITER $$
create function randomFlightObservation()
returns int
begin

declare observationsNumber int; 
declare observationId int;

select count(*) into observationsNumber from observation;
select IdObservation into observationId from observation where IdObservation = rand(@observationsNumber);

return observationId;
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
DELIMITER ;
