use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteObservation(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_ObservationText NVARCHAR(255),
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
    START TRANSACTION;
    
    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE observation
            SET 
                IsDelete = 1,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting observation: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE observation
            SET 
                ObservationText = p_ObservationText,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the observation.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO observation
        (
			Id,
            ObservationText,
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
            p_ObservationText,
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
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the observation table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;