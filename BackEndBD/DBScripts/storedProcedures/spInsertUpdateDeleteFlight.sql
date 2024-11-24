-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteFlight(
    -- DB atributes
    INOUT p_Id CHAR(36), 
    IN p_IdObservation CHAR(36),
    IN p_IdAirplane CHAR(36),
    IN p_FlightCode VARCHAR(10),
    IN p_Passengers INT,
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
    START TRANSACTION;
    
    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE flight
            SET 
				IsDelete = 1,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting flight: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE flight
            SET 
                IdObservation = p_IdObservation,
                IdAirplane = p_IdAirplane,
                FlightCode = p_FlightCode,
                Passengers = p_Passengers,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the flight.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO flight
        (
            Id,
            IdObservation,
            IdAirplane,
            FlightCode,
            Passengers,
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
            p_IdObservation,
            p_IdAirplane,
            p_FlightCode,
            p_Passengers,
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
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the flight table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;