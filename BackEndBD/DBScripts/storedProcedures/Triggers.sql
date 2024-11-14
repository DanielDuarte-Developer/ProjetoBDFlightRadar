DELIMITER $$

CREATE TRIGGER deleteAirlineDepencies AFTER UPDATE ON airline FOR EACH ROW
BEGIN
	UPDATE airport_flight SET sys_status = 'X' WHERE id_flight = (SELECT id_flight FROM flight WHERE id_airplane = (SELECT id_airplane FROM airplane WHERE id_airline = OLD.id_airline));
	UPDATE flight SET sys_status = 'X' WHERE id_airplane = (SELECT id_airplane FROM airplane WHERE id_airline = OLD.id_airline);
	UPDATE airplane SET sys_status = 'X' WHERE id_airline = OLD.id_airline;
END $$    

CREATE TRIGGER deleteAirplaneDepencies AFTER UPDATE ON airplane FOR EACH ROW
BEGIN
	UPDATE airport_flight SET sys_status = 'X' WHERE id_flight = (SELECT id_flight FROM flight WHERE id_airplane = OLD.id_airplane);
	UPDATE flights SET sys_status = 'X' WHERE id_airplane = OLD.id_airplane;
END $$    

CREATE TRIGGER deleteFlightDepencies AFTER UPDATE ON flight FOR EACH ROW
BEGIN
	UPDATE airport_flight SET sys_status = 'X' WHERE id_flight = old.id_flight;
END $$   

CREATE TRIGGER deleteAirportDepencies AFTER UPDATE ON airport FOR EACH ROW
BEGIN
	UPDATE flight SET sys_status = 'X' WHERE id_flight = (SELECT id_flight FROM airport_flight WHERE id_airport = OLD.id_airport);
	UPDATE airport_flight SET sys_status = 'X' WHERE id_airport = old.id_airport;
END $$   

CREATE TRIGGER setFlightObservation AFTER INSERT ON flight FOR EACH ROW
BEGIN
	DECLARE rand int;
	SET @rand = (SELECT RAND(100)); 
    IF rand < 25 THEN
    UPDATE flight SET id_observation = randomFlightObservation();
    END IF;
END $$