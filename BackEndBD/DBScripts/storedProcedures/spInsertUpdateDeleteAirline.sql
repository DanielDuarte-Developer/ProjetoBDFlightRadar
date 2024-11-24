-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirline(
    -- DB atributes
    INOUT p_Id CHAR(36),
    IN p_IdCountry CHAR(36),
    IN p_AirlineName NVARCHAR(100),
    IN p_AirlineCode CHAR(10),
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
    START TRANSACTION;

    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE airline
            SET 
				IsDelete = 1,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airline: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airline
            SET 
                IdCountry = p_IdCountry,
                AirlineName = p_AirlineName,
                AirlineCode = p_AirlineCode,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airline.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO airline
        (
            Id,
            IdCountry,
            AirlineName,
            AirlineCode,
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
            p_IdCountry,
            p_AirlineName,
            p_AirlineCode,
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
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the airline table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify if the line was modified
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;