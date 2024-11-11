DELIMITER $$
create function randomFlightObservation()
returns int
begin

declare observationsNumber int; 
declare observationId int;

select count(*) into observationsNumberfrom from observation;
select id_observation into observationId from observation where id_observation = rand(@observationsNumber);

return observationId;
end $$