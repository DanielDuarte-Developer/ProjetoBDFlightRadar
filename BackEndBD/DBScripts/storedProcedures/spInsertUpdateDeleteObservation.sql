use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteObservation(
    -- DB atributes
    INOUT Id CHAR(32),
    IN ObservationText NVARCHAR(255),
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during observation Stored Procedure execution';
    END;

    START TRANSACTION;
    
    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE observation
            SET 
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting observation: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE observation
            SET 
                observation_text = ObservationText,
                sys_status = SysStatus,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the observation.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
        INSERT INTO observation
        (
            observation_text,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            Id,
            ObservationText,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the observation table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT Id;
    ELSE
        SET Id = NULL;
        SELECT Id;
    END IF;
END $$

DELIMITER ;