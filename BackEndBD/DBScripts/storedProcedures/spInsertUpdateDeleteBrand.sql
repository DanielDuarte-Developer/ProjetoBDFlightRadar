use flight_radar;
DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteBrand(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdCountry CHAR(32),
    IN p_BrandName NVARCHAR(100),
    -- Control atributes
    IN p_SysStatus NVARCHAR(255), 
    IN p_UserId CHAR(32)
)
BEGIN
    START TRANSACTION;

    IF p_Id IS NOT NULL THEN
        IF p_SysStatus = 'X' THEN
            UPDATE brand
            SET 
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting brand: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE brand
            SET 
                IdCountry = p_IdCountry,
                BrandName = p_BrandName,
                SysStatus = p_SysStatus,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;

            -- Verify if the line was modified 
            IF ROW_COUNT() = 0 THEN
            ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update error: No lines were modified on the brand.';
            END IF;
        END IF;
    ELSE
        SET p_Id = UUID();
        INSERT INTO brand
        (
            IdCountry,
            BrandName,
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
            p_BrandName,
            p_SysStatus,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
        );

        -- Verify if was inserted with success
        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insertion error: Error inserting into the brand table.';
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