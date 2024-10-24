-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================

DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirport(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdBrand CHAR(36),
    IN p_IdFlightCompany CHAR(36),
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36),
    IN p_RowVersion CHAR(36),
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
                id_brand = p_IdBrand,
                id_flight_company = p_IdFlightCompany,
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
            id_brand,
            id_flight_company,
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
            p_IdFlightCompany,
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