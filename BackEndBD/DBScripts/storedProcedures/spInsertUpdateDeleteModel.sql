use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteModel(
    -- DB atributes
    INOUT p_Id CHAR(32),
    IN p_IdBrand CHAR(32),
    IN p_SitsNumber INT,
    IN p_Tare INT,
    IN p_GrossWeight INT,
    IN p_Payload INT,
    IN p_FlightCrewNumber INT,
    IN p_FuelQuantity INT,
    IN p_ModelYear INT,
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION	
    BEGIN
        ROLLBACK;
        SET p_Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during model Stored Procedure execution';
    END;
    START TRANSACTION;

    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE model
            SET 
                IsDelete = 1,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting model: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE model
            SET 
                IdBrand = p_IdBrand,
                SitsNumber = p_SitsNumber,
                Tare = p_Tare,
                GrossWeight = p_GrossWeight,
                Payload = p_Payload,
                FlightCrewNumber = p_FlightCrewNumber,
                FuelQuantity = p_FuelQuantity,
                ModelYear = p_ModelYear,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the model.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO model
        (
            IdBrand,
            SitsNumber,
            Tare,
            GrossWeight ,
            Payload,
            FlightCrewNumber,
            FuelQuantity,
            ModelYear,
            IsDelete,
            SysStatus,
            SysCreateDate,
            SysCreateUserId,
            SysModifyDate,
            SysModifyUserId
        )
        VALUES
        (
            p_Id,
            p_IdBrand,
            p_SitsNumber,
            p_Tare,
            p_GrossWeight,
            p_Payload,
            p_FlightCrewNumber,
            p_FuelQuantity,
            p_ModelYear,
            0,
            p_SysStatus,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
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
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;