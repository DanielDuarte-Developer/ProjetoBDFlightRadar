use flight_radar;

DELIMITER $$
create function randomFlightObservation()
returns varchar(100)
No Sql
READS SQL DATA 
begin

declare observationsNumber int; 
declare observationId varchar(100);

select IdObservation into observationId from observation order by rand() limit 1;

return observationId;
end $$

DELIMITER $$

CREATE PROCEDURE getDeparture(
    INOUT flightId VARCHAR(100), 
    OUT airportId VARCHAR(100), 
    OUT timeM TIMESTAMP
)
BEGIN
    -- Realizando o SELECT INTO para atribuição dos valores
    SELECT IdAirport, TimeMarker
    INTO airportId, timeM
    FROM airport_flight
    WHERE IdFlight = flightId
    ORDER BY TimeMarker ASC
    LIMIT 1;
END $$

DELIMITER $$
create procedure getArrival(flightId varchar(100), out airportId varchar(100), out timeM timestamp)
begin
    select IdAirport, TimeMarker into airportId, timeM from airport_flight where IdFlight = flightId order by TimeMarker desc limit 1;
end $$

DELIMITER $$
create procedure getStopOvers(flightId varchar(100), out airportId varchar(100), out timeM timestamp)
begin
    select IdAirport, TimeMarker into airportId, timeM from airport_flight where IdFlight = flightId and TimeMarker > (select TimeMarker from airport_flight order by TimeMarker asc limit 1) and TimeMarker < (select TimeMarker from airport_flight order by TimeMarker desc limit 1);
end $$

DELIMITER $$
CREATE PROCEDURE getMapPlaneValues(
    INOUT flightIdin VARCHAR(100), 
    OUT startLat INT, 
    OUT startLong INT, 
    OUT endLat INT, 
    OUT endLong INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE airportId VARCHAR(100);
    DECLARE timeMarker TIMESTAMP;
    DECLARE cursorFlightIds CURSOR FOR SELECT Id FROM flight;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Inicializando os valores de saída
    SET startLat = 0; 
    SET startLong = 0; 
    SET endLat = 0; 
    SET endLong = 0;

    -- Criando a tabela temporária para armazenar os resultados
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_results (
        FlightId VARCHAR(100),
        StartLat INT,
        StartLong INT,
        EndLat INT,
        EndLong INT
    );

    -- Limpando a tabela temporária antes de inserir novos dados
    TRUNCATE TABLE temp_results;

	-- Obtendo a partida (departure)
	CALL getDeparture(flightIdin, airportId, timeMarker);
	SELECT LocationLatitude, LocationLongitude INTO startLat, startLong
	FROM airport
	WHERE Id = airportId;

	-- Obtendo a chegada (arrival)
	CALL getArrival(flightIdin, airportId, timeMarker);
	SELECT LocationLatitude, LocationLongitude INTO endLat, endLong
	FROM airport
	WHERE Id = airportId;

	-- Inserindo os dados na tabela temporária
	INSERT INTO temp_results (FlightId, StartLat, StartLong, EndLat, EndLong)
	VALUES (flightIdin, startLat, startLong, endLat, endLong);


    -- Selecionando os dados para o flightId fornecido
    SELECT FlightId ,StartLat, StartLong, EndLat, EndLong
    FROM temp_results
    WHERE FlightId = flightIdin
    LIMIT 1;

    -- Remover a tabela temporária após o uso (opcional, já que é temporária)
    DROP TEMPORARY TABLE IF EXISTS temp_results;

END $$


DELIMITER $$
create procedure getFlightCardInfo(inout flightId varchar(100), out flightCD char(7), out passeng int,
out startTime timestamp, out endT timestamp,
out startAirportName nvarchar(100), out startAirportCode char(3), out startLocation nvarchar(50), out startCountry nvarchar(100),
out endAirportName nvarchar(100), out endAirportCode char(3), out endLocation nvarchar(50), out endCountry nvarchar(100),
out airplaneBrandName nvarchar(100), out airplaneModelName nvarchar(100), out airPlaneModelImage varchar(1000),
out airlineN nvarchar(100), out flightDuration time)

begin
declare airplaneId varchar(100);
declare airplaneModelId varchar(100);
declare airplaneBrandId varchar(100);
declare airlineId varchar(100);
declare startCountryId varchar(100);
declare endCountryId varchar(100);
declare startAirportId varchar(100);
declare endAirportId varchar(100);

select Id, IdAirplane, FlightCode, Passengers into flightId, airplaneId, flightCD, passeng from flight Where Id = flightId;

select IdModel, IdAirline into airplaneModelId, airlineId from airplane where Id = airplaneId;

select IdBrand, ModelName, ModelImage into airplaneBrandId, airplaneModelName, airPlaneModelImage from model where Id = airplaneModelId;

select BrandName into airplaneBrandName from brand where Id = airplaneBrandId;

select AirlineName into airlineN from airline where Id = airlineId;

call getDeparture(flightId, startAirportId, startTime);
call getArrival(flightId, endAirportId, endT);

select IdCountry, AirportName, AirportCode, LocationName into startCountryId, startAirportName, startAirportCode, startLocation from airport where Id = startAirportId;
select IdCountry, AirportName, AirportCode, LocationName into endCountryId, endAirportName, endAirportCode, endLocation from airport where Id = endAirportId;

select CountryName into startCountry from country where Id = startCountryId; 
select CountryName into endCountry from country where Id = endCountryId; 

set flightDuration = timediff(endT,startTime);

Select flightCD, passeng, startTime, endT, startAirportName,startAirportCode, startLocation, startCountry, endAirportName, endAirportCode, endLocation, 
endCountry, airplaneBrandName, airplaneModelName, airPlaneModelImage, airlineN, flightDuration;

end $$

DELIMITER ;
