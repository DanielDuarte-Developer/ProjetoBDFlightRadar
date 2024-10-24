-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================

DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirplaneFlight(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdFlight CHAR(36),
    IN p_IdAirplane CHAR(36),
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36),
    IN p_RowVersion CHAR(36)
)
BEGIN
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airplane_flight
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;
        ELSE
            UPDATE airplane_flight
            SET 
                id_flight = p_IdFlight,
                id_airplane = p_IdAirplane,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id AND row_version = p_RowVersion;
        END IF;
    ELSE
        SET p_Id = UUID(); 
        INSERT INTO airplane_flight
        (
            id_airplane_flight,
            id_flight,
            id_airplane,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            p_Id,
            p_IdFlight,
            p_IdAirplane,
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