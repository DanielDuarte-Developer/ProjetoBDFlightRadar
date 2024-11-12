-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteFlight(
    -- DB atributes
    INOUT Id CHAR(32), 
    IN IdObservation CHAR(32),
    IN IdAirplane CHAR(32),
    IN FlightCode VARCHAR(10),
    IN Passengers INT,
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(36)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during flight Stored Procedure execution';
    END;

    START TRANSACTION;
    
    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE flight
            SET 
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting flight: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE flight
            SET 
                id_observation = IdObservation,
                id_airplane = IdAirplane,
                flight_code = FlightCode,
                passengers = Passengers,
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the flight.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
        INSERT INTO flight
        (
            id_flight,
            id_observation,
            id_airplane,
            flight_code,
            passengers,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            Id,
            IdObservation,
            IdAirplane,
            FlightCode,
            Passengers,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the flight table.';
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