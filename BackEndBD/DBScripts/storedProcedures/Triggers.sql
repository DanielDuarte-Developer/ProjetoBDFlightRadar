use flight_radar;

DELIMITER $$

CREATE TRIGGER deleteAirlineDepencies BEFORE UPDATE ON airline FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		UPDATE airport_flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdFlight = (SELECT Id FROM flight WHERE IdAirplane = (SELECT Id FROM airplane WHERE IdAirline = OLD.Id));
		UPDATE flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdAirplane = (SELECT Id FROM airplane WHERE IdAirline = OLD.Id);
		UPDATE airplane SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdAirline = OLD.Id;
    END IF;
END $$    

CREATE TRIGGER deleteAirplaneDepencies BEFORE UPDATE ON airplane FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		UPDATE airport_flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdFlight = (SELECT Id FROM flight WHERE IdAirplane = OLD.Id);
		UPDATE flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdAirplane = OLD.Id;
    END IF;
END $$    

CREATE TRIGGER deleteFlightDepencies BEFORE UPDATE ON flight FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 Then
		UPDATE airport_flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdFlight = old.Id;
     END IF;
END $$   

CREATE TRIGGER deleteAirportDepencies BEFORE UPDATE ON airport FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0  AND NEW.IsDelete = 1 Then
		UPDATE flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE Id = (SELECT IdFlight FROM airport_flight WHERE IdAirport = OLD.Id);
		UPDATE airport_flight SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP() WHERE IdAirport = old.Id;
	END IF;
END $$   

CREATE TRIGGER deleteObservationDepencies BEFORE UPDATE ON observation FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		UPDATE flight SET SysStatus = 'X',  SysModifyDate = UTC_TIMESTAMP() WHERE IdObservation = OLD.Id;
	END IF;
END $$   

CREATE TRIGGER deleteCountryDependecies After UPDATE ON country FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		 -- Apagar todas as companhias aéreas associadas ao país
		UPDATE airline
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdCountry = Old.Id;

		-- Apagar aviões associados às companhias aéreas do país
		UPDATE airplane
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdAirline IN (SELECT Id FROM airline WHERE IdCountry = Old.Id);

		-- Apagar aeroportos associados ao país
		UPDATE airport
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdCountry = Old.Id;

		-- Apagar marcas associadas ao país
		UPDATE brand
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdCountry = Old.Id;

		-- Apagar modelos associados às marcas do país
		UPDATE model
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdBrand IN (SELECT Id FROM brand WHERE IdCountry = Old.Id);

		-- Apagar voos associados aos aviões de companhias aéreas do país
		UPDATE flight
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdAirplane IN (SELECT Id FROM airplane WHERE IdAirline IN (SELECT Id FROM airline WHERE IdCountry = Old.Id));
		
    END IF;
END $$

CREATE TRIGGER deleteBrandDependencies BEFORE UPDATE ON brand FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		UPDATE flight
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdAirplane IN (SELECT Id FROM airplane WHERE IdModel IN (SELECT Id FROM model WHERE IdBrand = OLD.Id));

		UPDATE airplane
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdModel IN (SELECT Id FROM model WHERE IdBrand = OLD.Id);

		UPDATE model
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdBrand = OLD.Id;
	end if;
END $$

CREATE TRIGGER deleteModelDepencies BEFORE UPDATE ON model FOR EACH ROW
BEGIN
	IF Old.IsDelete = 0 AND NEW.IsDelete = 1 Then
		-- Apagar voos associados aos aviões do modelo
		UPDATE flight
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdAirplane IN (SELECT Id FROM airplane WHERE IdModel = OLD.Id);

		-- Apagar aviões do modelo
		UPDATE airplane
		SET SysStatus = 'X', SysModifyDate = UTC_TIMESTAMP()
		WHERE IdModel = OLD.Id;
	END IF;
END $$   

CREATE TRIGGER setFlightObservation BEFORE INSERT ON flight FOR EACH ROW
BEGIN
	DECLARE rand int;
	SET @rand = (SELECT RAND(100)); 
    IF rand < 25 THEN
    UPDATE flight SET IdObservation = randomFlightObservation();
    END IF;
END $$

DELIMITER ;