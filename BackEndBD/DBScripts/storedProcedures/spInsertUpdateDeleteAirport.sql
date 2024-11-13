-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirport(
    -- DB atributes
    INOUT Id CHAR(32),
    IN IdCountry CHAR(32),
    IN AirportName NVARCHAR(100),
    IN AirportCode CHAR(10),
    IN LocationName NVARCHAR(100),
    IN LocationLatitude INT,
    IN LocationLongitude INT,
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during airport Stored Procedure execution';
    END;

    START TRANSACTION;
    
    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE airport
            SET 
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airport: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airport
            SET 
                id_country = IdCountry,
                airport_name = AirportName,
                airport_code = AirportCode,
                location_name = LocationName,
                location_latitude = LocationLatitude,
                location_longitude = LocationLongitude,
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airport.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
        INSERT INTO airport
        (
            id_plane,
            id_country,
            airport_name,
            airport_code,
            location_name,
            location_latitude,
            location_longitude,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            Id,
            IdCountry,
            AirportName,
            AirportCode,
            LocationName,
            LocationLatitude,
            LocationLongitude,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the airport table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verifica se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT Id;
    ELSE
        SET Id = NULL;
        SELECT Id;
    END IF;
END $$

DELIMITER ;