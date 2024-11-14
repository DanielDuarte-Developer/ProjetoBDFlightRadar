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
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting model: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE model
            SET 
                id_brand = IdBrand,
                sits_number = SitsNumber,
                tare = Tare,
                gross_weight = GrossWeight,
                payload = Payload,
                flight_crew_number = FlightCrewNumber,
                fuel_quantity = FuelQuantity,
                model_year = ModelYear,
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
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
            id_brand,
            sits_number,
            tare = Tare,
            gross_weight ,
            payload = Payload,
            flight_crew_number,
            fuel_quantity,
            model_year,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
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