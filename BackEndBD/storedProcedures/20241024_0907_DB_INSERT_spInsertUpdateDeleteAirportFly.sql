-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================

DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirportFlight(
    -- DB atributes
    INOUT p_Id CHAR(36), 
    IN p_IdAirport CHAR(36),
    IN p_IdFlight CHAR(36),
    IN p_Departure DateTime,
    IN p_Arrival DateTime,
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36),
    IN p_RowVersion CHAR(36),
)
BEGIN
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airport_flight
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;
        ELSE
            UPDATE airport_flight
            SET 
                id_airport = p_IdAirport,
                id_flight = p_IdFlight,
                departure = p_Departure,
                arrival = p_Arrival,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id AND row_version = p_RowVersion;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO airport_flight
        (
            id_airport_flight,
            id_airport,
            id_flight,
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
            p_Id,
            p_IdAirport,
            p_IdFlight,
            p_Departure,
            p_Arrival,
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