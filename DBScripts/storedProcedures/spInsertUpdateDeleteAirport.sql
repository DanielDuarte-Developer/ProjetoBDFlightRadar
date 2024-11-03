-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirport(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdCountry CHAR(36),
    IN p_AirportName NVARCHAR(100),
    IN p_AirportCode CHAR(10),
    IN p_LocationName NVARCHAR(100),
    IN p_LocationLatitude INT,
    IN p_LocationLongitude INT,
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36),
    IN p_RowVersion CHAR(36)
)
BEGIN
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airport
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;
        ELSE
            UPDATE airport
            SET 
                id_country = p_IdCountry,
                airport_name = p_AirportName,
                airport_code = p_AirportCode,
                location_name = p_LocationName,
                location_latitude = p_LocationLatitude,
                location_longitude = p_LocationLongitude,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id AND row_version = p_RowVersion;
        END IF;
    ELSE
        SET p_Id = UUID();
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
            p_Id,
            p_IdCountry,
            p_AirportName,
            p_AirportCode,
            p_LocationName,
            p_LocationLatitude,
            p_LocationLongitude,
            p_Status,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
        );
    END IF;

    -- Verifica se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;