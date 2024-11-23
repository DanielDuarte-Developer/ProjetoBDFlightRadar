use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteCountry(
    -- DB atributes
    INOUT p_Id VARCHAR(36),
    IN p_CountryName NVARCHAR(255),
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(32)
)
BEGIN
    START TRANSACTION;
    
    IF p_Id  IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE country
            SET 
                IsDelete = 1,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id =  p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting country: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE country
            SET 
                CountryName = p_CountryName,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;
			
            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the country.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO country
        (
			Id,
            CountryName,
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
            p_CountryName,
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
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the country table.';
        END IF;
    END IF;

    COMMIT;
    
    -- Verify se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET  p_Id= NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;