DELIMITER $$
create function randomFlightObservation()
returns int
begin

declare observationsNumber int; 
declare observationId int;

select count(*) into observationsNumberfrom from observation;
select I into observationId from observation where Id = rand(@observationsNumber);

return observationId;
end $$