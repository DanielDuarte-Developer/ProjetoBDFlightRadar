-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirplane(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdBrand CHAR(36),
    IN p_IdAirline CHAR(36),
    -- Control atributes
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during airplane Stored Procedure execution';
    END;

    START TRANSACTION;

    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE airplane
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airplane: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airplane
            SET 
                id_brand = p_IdBrand,
                id_airline = p_IdAirline,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airplane.';
            END IF;
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
        
        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the airplane table.';
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