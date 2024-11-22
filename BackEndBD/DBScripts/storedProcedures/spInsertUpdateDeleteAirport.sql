-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirport(
    -- DB atributes
    INOUT p_Id CHAR(32),
    IN p_IdCountry CHAR(32),
    IN p_AirportName NVARCHAR(100),
    IN p_AirportCode CHAR(10),
    IN p_LocationName NVARCHAR(100),
    IN p_LocationLatitude INT,
    IN p_LocationLongitude INT,
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(32)
)
BEGIN
    START TRANSACTION;
    
    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE airport
            SET 
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airport: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airport
            SET 
                IdCountry = p_IdCountry,
                AirportName = p_AirportName,
                AirportCode = p_AirportCode,
                LocationName = p_LocationName,
                LocationLatitude = p_LocationLatitude,
                LocationLongitude = p_LocationLongitude,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airport.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO airport
        (
            IdPlane,
            IdCountry,
            AirportName,
            AirportCode,
            LocationName,
            LocationLatitude,
            LocationLongitude,
            SysStatus,
            SysCreateDate,
            SysCreateUserId,
            SysModifyDate,
            SysModifyUserId
        )
        VALUES
        (
            p_Id,
            p_IdCountry,
            p_AirportName,
            p_AirportCode,
            p_LocationName,
            p_LocationLatitude,
            p_LocationLongitude,
            p_SysStatus,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the airport table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;