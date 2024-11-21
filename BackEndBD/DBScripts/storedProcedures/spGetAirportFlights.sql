-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirportFlights(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdAirport CHAR(32),
    IN p_IdFlight CHAR(32),
    IN p_TimeMarker timestamp,
    -- Control atributes
    IN p_UserId VARCHAR(255),
    IN p_Status VARCHAR(255),
    IN p_SortField VARCHAR(50),
    IN p_SortOrder VARCHAR(4),
    IN p_Skip INT,
    IN p_Take INT
)
BEGIN
    -- Setting default values
    SET p_IdAirport = IFNULL(p_IdAirport, NULL);
    SET p_IdFlight = IFNULL(p_IdFlight, NULL);
    SET p_TimeMarker = IFNULL(p_TimeMarker, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'Id');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
    
    -- Query principal
    SELECT
        *
    FROM airplane_flight
    WHERE (p_Id IS NULL OR Id = p_Id)
        AND (p_IdAirport IS NULL OR Id = p_IdAirport)
        AND (p_IdFlight IS NULL OR IdFlight = p_IdFlight)
        AND (p_TimeMarker IS NULL OR TimeMarker = p_TimeMarker)
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdAirport' THEN IdAirport END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdAirport' THEN IdAirport END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdFlight' THEN IdFlight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdFlight' THEN IdFlight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'TimeMarker' THEN TimeMarker END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'TimeMarker' THEN TimeMarker END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysStatus' THEN SysStatus END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysStatus' THEN SysStatus END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysCreateDate' THEN SysCreateDate END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysCreateDate' THEN SysCreateDate END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysCreateUserId' THEN SysCreateUserId END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysCreateUserId' THEN SysCreateUserId END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysModifyDate' THEN SysModifyDate END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysModifyDate' THEN SysModifyDate END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SysModifyUserId' THEN SysModifyUserId END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SysModifyUserId' THEN SysModifyUserId END DESC
    -- Paginação com LIMIT e OFFSET
    LIMIT p_Take OFFSET p_Skip;
END $$
DELIMITER ;
