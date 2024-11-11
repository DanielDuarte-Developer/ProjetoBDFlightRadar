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
    IN p_Status NVARCHAR(255), 
    IN p_UserId CHAR(36)
)
BEGIN
	SET @planeId = '';
    SET @numAirplanes = 0;

	DECLARE deleteAirlineAirplanes CURSOR FOR
	SELECT id_airplane From airplane Where id_airline = p_Id;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_Id = NULL;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected error during arline Stored Procedure execution';
    END;
    START TRANSACTION;

    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
        @numAirplanes = SELECT id_airplane From airplane Where id_airline = p_Id;
            IF containsForeignValue('airline', p_Id) THEN
                OPEN deleteAirlineAirplanes;
                    WHILE 1 = 1 DO
                        FETCH deleteAirlineAirplanes INTO @planeId;
                        Call spInsertUpdateDeleteAirplane(@planeId,null,null,X, p_UserId);
                    END WHILE;
                CLOSE deleteAirlineAirplanes;
                -- Call spInsertUpdateDeleteAirplane(id,null,null,p_Status,p_UserId,null)
            END IF;
            UPDATE airline
            SET 
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
            WHERE Id = p_Id;

            -- Verify if the "delete" was successed (updated status)
            IF ROW_COUNT() = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error deleting airline: No lines were modified or were already inactive.';
            END IF;
        ELSE
            UPDATE airline
            SET 
                id_country = p_IdCountry,
                airline_name = p_AirlineName,
                airline_code = p_AirlineCode,
                sys_status = p_Status,
                sys_modify_date = UTC_TIMESTAMP(),
                sys_modify_user_id = p_UserId
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
            id_airline,
            id_country,
            airline_name,
            airline_code,
            sys_status,
            sys_create_date,
            sys_create_user_id,
            sys_modify_date,
            sys_modify_user_id
        )
        VALUES
        (
            p_Id,
            p_IdCountry,
            p_AirlineName,
            p_AirlineCode,
            p_Status,
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
    
    -- Verifica if the line was modified
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;