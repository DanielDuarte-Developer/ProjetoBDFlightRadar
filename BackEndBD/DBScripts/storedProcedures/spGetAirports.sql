-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAiports(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdCountry CHAR(32),
    IN p_AirportName VARCHAR(30),
    IN p_AirportCode VARCHAR(30),
    IN p_LocationName VARCHAR(30),
    IN p_LocationLatitude INT,
    IN p_LocationLongitude INT,
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
    SET p_IdCountry = IFNULL(p_IdCountry, NULL);
    SET p_AirportName = IFNULL(p_AirportName, NULL);
    SET p_AirportCode = IFNULL(p_AirportCode, NULL);
    SET p_LocationName = IFNULL(p_LocationName, NULL);
    SET p_LocationLatitude = IFNULL(p_LocationLatitude, NULL);
    SET p_LocationLongitude = IFNULL(p_LocationLongitude, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'Id');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
    
    -- Query principal
    SELECT
        *
    FROM airport
    WHERE (p_Id IS NULL OR Id = p_Id)
        AND (p_IdCountry IS NULL OR IdCountry = p_IdCountry)
        AND (p_AirportName IS NULL OR AirportName = p_AirportName)
        AND (p_AirportCode IS NULL OR AirportCode = p_AirportCode)
        AND (p_LocationName IS NULL OR LocationName = p_LocationName)
        AND (p_LocationLatitude IS NULL OR LocationLatitude = p_LocationLatitude)
        AND (p_LocationLongitude IS NULL OR LocationLongitude = p_LocationLongitude)
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdCountry' THEN IdCountry END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdCountry' THEN IdCountry END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'AirportName' THEN AirportName END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'AirportName' THEN AirportName END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'AirportCode' THEN AirportCode END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'AirportCode' THEN AirportCode END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'LocationName' THEN LocationName END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'LocationName' THEN LocationName END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'LocationLatitude' THEN LocationLatitude END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'LocationLatitude' THEN LocationLatitude END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'LocationLongitude' THEN LocationLongitude END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'LocationLongitude' THEN LocationLongitude END DESC,
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
