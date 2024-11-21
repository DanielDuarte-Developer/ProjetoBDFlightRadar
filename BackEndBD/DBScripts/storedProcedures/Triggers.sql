DELIMITER $$

CREATE TRIGGER deleteAirlineDepencies AFTER UPDATE ON airline FOR EACH ROW
BEGIN
	UPDATE airport_flight SET SysStatus = 'X' WHERE IdFlight = (SELECT IdFlight FROM flight WHERE IdAirplane = (SELECT IdAirplane FROM airplane WHERE IdAirline = OLD.IdAirline));
	UPDATE flight SET SysStatus = 'X' WHERE IdAirplane = (SELECT IdAirplane FROM airplane WHERE IdAirline = OLD.IdAirline);
	UPDATE airplane SET SysStatus = 'X' WHERE IdAirline = OLD.IdAirline;
END $$    

CREATE TRIGGER deleteAirplaneDepencies AFTER UPDATE ON airplane FOR EACH ROW
BEGIN
	UPDATE airport_flight SET SysStatus = 'X' WHERE IdFlight = (SELECT IdFlight FROM flight WHERE IdAirplane = OLD.IdAirplane);
	UPDATE flights SET SysStatus = 'X' WHERE IdAirplane = OLD.IdAirplane;
END $$    

CREATE TRIGGER deleteFlightDepencies AFTER UPDATE ON flight FOR EACH ROW
BEGIN
	UPDATE airport_flight SET SysStatus = 'X' WHERE IdFlight = old.IdFlight;
END $$   

CREATE TRIGGER deleteAirportDepencies AFTER UPDATE ON airport FOR EACH ROW
BEGIN
	UPDATE flight SET SysStatus = 'X' WHERE IdFlight = (SELECT IdFlight FROM airport_flight WHERE IdAirport = OLD.IdAirport);
	UPDATE airport_flight SET SysStatus = 'X' WHERE IdAirport = old.IdAirport;
END $$   

CREATE TRIGGER setFlightObservation AFTER INSERT ON flight FOR EACH ROW
BEGIN
	DECLARE rand int;
	SET @rand = (SELECT RAND(100)); 
    IF rand < 25 THEN
    UPDATE flight SET IdObservation = randomFlightObservation();
    END IF;
END $$