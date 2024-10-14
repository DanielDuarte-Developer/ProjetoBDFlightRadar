-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================

DELIMITER $$

CREATE PROCEDURE spInsertUpdateDeleteFlight(
    INOUT p_Id CHAR(36), -- Equivalente ao UNIQUEIDENTIFIER no SQL Server
    IN p_Status NVARCHAR(255), -- Adaptei o tamanho, ajuste conforme necessário
    IN p_UserId CHAR(36), -- Presume que o UserId seja um UUID
    IN p_RowVersion CHAR(36), -- Equivalente ao SysRowVersion (ajustar conforme o uso)
    IN p_FlightCode VARCHAR(10), -- Defini os parâmetros que estavam comentados
    IN p_Departure VARCHAR(3),
    IN p_Arrival VARCHAR(3),
    IN p_Distance INT
)
BEGIN
    IF p_Id IS NOT NULL THEN
        IF p_Status = 'X' THEN
            UPDATE Flight
            SET 
                SysStatus = p_Status,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id;
        ELSE
            UPDATE Flight
            SET 
                -- Verifique e adicione os campos necessários
                SysStatus = p_Status,
                SysModifyDate = UTC_TIMESTAMP(),
                SysModifyUserId = p_UserId
            WHERE Id = p_Id AND SysRowVersion = p_RowVersion;
        END IF;
        
        -- Inserindo na tabela 'voos'
        INSERT INTO voos (flight_code, departure, arrival, distance)
        VALUES (p_FlightCode, p_Departure, p_Arrival, p_Distance);
    ELSE
        SET p_Id = UUID(); -- Gerando novo UUID
        INSERT INTO Reservation
        (
            -- Verifique os campos necessários
            SysStatus,
            SysCreateDate,
            SysCreateUserId,
            SysModifyDate,
            SysModifyUserId
        )
        VALUES
        (
            -- Verifique e adicione os valores
            p_Status,
            UTC_TIMESTAMP(),
            p_UserId,
            UTC_TIMESTAMP(),
            p_UserId
        );
    END IF;

    -- Verificar se a linha foi modificada
    IF ROW_COUNT() > 0 THEN
        SELECT p_Id;
    ELSE
        SET p_Id = NULL;
        SELECT p_Id;
    END IF;
END $$

DELIMITER ;