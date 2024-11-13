-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirplane(
    -- DB atributes
    INOUT Id CHAR(32),
    IN IdBrand CHAR(32),
    IN IdAirline CHAR(32),
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during airplane Stored Procedure execution';
    END;

    START TRANSACTION;

    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE airplane
            SET 
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airplane: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airplane
            SET 
                id_brand = IdBrand,
                id_airline = IdAirline,
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airplane.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
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
            Id,
            IdBrand,
            IdAirline,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
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
        SELECT Id;
    ELSE
        SET Id = NULL;
        SELECT Id;
    END IF;
END $$

DELIMITER ;