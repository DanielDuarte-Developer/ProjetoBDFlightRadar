-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirportAirplaneFlight(
    -- DB atributes
	INOUT p_Id CHAR(36), 
    IN p_IdAirport CHAR(36),
    IN p_IdFlight CHAR(36),
    IN p_IdAirplane CHAR(36),
    IN p_Departure DateTime,
    IN p_Arrival DateTime,
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during airportairplaneflight Stored Procedure execution';
    END;

    START TRANSACTION;
    
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airport_airplane_flight
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airportairplaneflight: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airport_airplane_flight
            SET 
                id_airport = p_IdAirport,
                id_flight = p_IdFlight,
                id_airplane = p_IdAirplane,
                departure = p_Departure,
                arrival = p_Arrival,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airportairplaneflight.';
            END IF;
        END IF;
    ELSE
        INSERT INTO airport_airplane_flight
        (
            id_airport,
            id_flight,
            id_airplane,
            departure,
            arrival,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            p_IdAirport,
            p_IdFlight,
            p_IdAirplane,
            p_Departure,
            p_Arrival,
            p_Status,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the airportairplaneflight table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verifica se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;