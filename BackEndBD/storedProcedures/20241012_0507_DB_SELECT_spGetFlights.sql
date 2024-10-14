-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetFlights(
    IN p_Id CHAR(36) DEFAULT NULL,
    -- Ajuste para os parâmetros que estavam comentados
    -- IN p_FlightCode VARCHAR(10) DEFAULT NULL,
    -- IN p_Departure VARCHAR(3) DEFAULT NULL,
    -- IN p_Arrival VARCHAR(3) DEFAULT NULL,
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'Id',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM Flight
    WHERE (p_Id IS NULL OR Id = p_Id)
    -- Verificar os atributos comentados (adicionar condições se necessário)
        -- AND (p_RoomId IS NULL OR RoomId = p_RoomId)
        -- AND (
                -- (p_startDateTime IS NULL AND p_endDateTime IS NULL)
                -- OR (p_startDateTime IS NOT NULL AND p_endDateTime IS NOT NULL AND startDateTime BETWEEN p_startDateTime AND p_endDateTime)
                -- OR (p_startDateTime IS NOT NULL AND p_endDateTime IS NULL AND startDateTime >= p_startDateTime)
                -- OR (p_startDateTime IS NULL AND p_endDateTime IS NOT NULL AND startDateTime <= p_endDateTime)
            -- )
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysStatus' THEN SysStatus END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysStatus' THEN SysStatus END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysCreateDate' THEN SysCreateDateEND ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysCreateDate' THEN SysCreateDate END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysCreateUserId' THEN SysCreateUserId END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysCreateUserId' THEN SysCreateUserId END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysModifyDate' THEN SysModifyDateEND ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysModifyDate' THEN SysModifyDateEND DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysModifyUserId' THEN SysModifyUserId END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysModifyUserId' THEN SysModifyUserId END DESC
    -- Paginação com LIMIT e OFFSET
    LIMIT p_Take OFFSET p_Skip;
END $$
DELIMITER ;
