use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteModel(
    -- DB atributes
    INOUT Id CHAR(32),
    IN IdBrand CHAR(32),
    IN SitsNumber INT,
    IN Tare INT,
    IN GrossWeight INT,
    IN Payload INT,
    IN FlightCrewNumber INT,
    IN FuelQuantity INT,
    IN ModelYear INT,
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION	
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during model Stored Procedure execution';
    END;
    START TRANSACTION;

    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE model
            SET 
                SysStatus = SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting model: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE model
            SET 
                IdBrand = IdBrand,
                SitsNumber = SitsNumber,
                Tare = Tare,
                GrossWeight = GrossWeight,
                Payload = Payload,
                FlightCrewNumber = FlightCrewNumber,
                FuelQuantity = FuelQuantity,
                ModelYear = ModelYear,
                SysStatus = SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the model.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
        INSERT INTO model
        (
            IdBrand,
            SitsNumber,
            Tare = Tare,
            GrossWeight ,
            Payload = Payload,
            FlightCrewNumber,
            FuelQuantity,
            ModelYear,
            SysStatus,
            SysCreateDate,
            SysCreateUserId,
            SysModifyDate,
            SysModifyUserId
        )
        VALUES
        (
            Id,
            IdBrand,
            SitsNumber,
            Tare,
            GrossWeight,
            Payload,
            FlightCrewNumber,
            FuelQuantity,
            ModelYear,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the model table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify if the line was modified
    IF ROW_COUNT() > 0 THEN
        SELECT Id;
    ELSE
        SET Id = NULL;
        SELECT Id;
    END IF;
END $$

DELIMITER ;