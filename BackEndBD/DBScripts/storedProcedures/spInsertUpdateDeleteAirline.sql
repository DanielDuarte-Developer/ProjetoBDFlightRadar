-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteAirline(
    -- DB atributes
    INOUT Id CHAR(32),
    IN IdCountry CHAR(32),
    IN AirlineName NVARCHAR(100),
    IN AirlineCode CHAR(10),
    -- Control atributes
    IN SysStatus NVARCHAR(255), 
    IN UserId CHAR(32)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION	
    BEGIN
        ROLLBACK;
        SET Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during airline Stored Procedure execution';
    END;
    START TRANSACTION;

    IF Id IS NOT NULL THEN
        IF SysStatus = 'X' THEN
            UPDATE airline
            SET 
                SysStatus = SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = UserId
            WHERE Id = Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airline: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airline
            SET 
                IdCountry = IdCountry,
                ArlineName = AirlineName,
                ArlineCode = AirlineCode,
                SysStatus = SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = UserId
            WHERE Id = Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the airline.';
            END IF;
        END IF;
    ELSE
        SET Id = UUID();
        INSERT INTO airline
        (
            IdAirline,
            IdCountry,
            ArlineName,
            ArlineCode,
            SysStatus,
            SysCreateDate,
            SysCreateUserId,
            SysModifyDate,
            SysModifyUserId
        )
        VALUES
        (
            Id,
            IdCountry,
            AirlineName,
            AirlineCode,
            SysStatus,
            UTC_TIMESTAMP(),
            UserId,
            UTC_TIMESTAMP(),
            UserId
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
        SELECT Id;
    ELSE
        SET Id = NULL;
        SELECT Id;
    END IF;
END $$

DELIMITER ;