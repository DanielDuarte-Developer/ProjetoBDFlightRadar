-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================

DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirplane(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdBrand CHAR(36),
    IN p_IdAirline CHAR(36),
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36),
    IN p_RowVersion CHAR(36),
)
BEGIN
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airplane
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;
        ELSE
            UPDATE airplane
            SET 
                id_brand = p_IdBrand,
                id_airline = p_IdAirline,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id AND row_version = p_RowVersion;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO airplane
        (
            id_plane,
            id_brand,
            id_airline,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            p_Id,
            p_IdBrand,
            p_IdAirline,
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