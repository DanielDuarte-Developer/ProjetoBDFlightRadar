-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetFlights(
    -- DB atributes
    IN p_Id CHAR(36),
    IN p_IdObservation CHAR(36),
    IN p_IdAirplane CHAR(36),
    IN p_FlightCode VARCHAR(10),
    IN p_Passengers INT,
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
    SET p_Id = IFNULL(p_Id, NULL);
    SET p_IdObservation = IFNULL(p_IdObservation, NULL);
    SET p_IdAirplane = IFNULL(p_IdAirplane, NULL);
    SET p_FlightCode = IFNULL(p_FlightCode, NULL);
    SET p_Passengers = IFNULL(p_Passengers, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'Id');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);

    -- Query principal
    SELECT
        *
    FROM flight
    WHERE (p_Id IS NULL OR Id = p_Id)
        AND (p_IdObservation IS NULL OR IdObservation = p_IdObservation)
        AND (p_IdAirplane IS NULL OR IdAirplane = p_IdAirplane)
        AND (p_FlightCode IS NULL OR FlightCode = p_FlightCode)
        AND (p_Passengers IS NULL OR Passengers = p_Passengers) 
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdObservation' THEN IdObservation END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdObservation' THEN IdObservation END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdAirplane' THEN IdAirplane END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdAirplane' THEN IdAirplane END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'FlightCode' THEN FlightCode END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'FlightCode' THEN FlightCode END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Passengers' THEN Passengers END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Passengers' THEN Passengers END DESC,
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
