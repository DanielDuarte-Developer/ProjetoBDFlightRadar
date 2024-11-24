-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirlines(
    -- DB atributes
    IN p_Id CHAR(36),
    IN p_IdCountry CHAR(32),
    IN p_AirlineName NVARCHAR(100),
    IN p_AirlineCode CHAR(10),
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
    SET p_AirlineName = IFNULL(p_AirlineName, NULL);
    SET p_AirlineCode = IFNULL(p_AirlineCode, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'Id');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
 
    -- Query principal
    SELECT
        *
    FROM airline
    WHERE (p_Id IS NULL OR Id = p_Id)
        AND (p_IdCountry IS NULL OR IdCountry = p_IdCountry)
        AND (p_AirlineName IS NULL OR AirlineName = p_AirlineName)
        AND (p_AirlineCode IS NULL OR AirlineCode = p_AirlineCode)
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdCountry' THEN IdCountry END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdCountry' THEN IdCountry END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'AirlineName' THEN AirlineName END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'AirlineName' THEN AirlineName  END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'AirlineCode' THEN AirlineCode END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'AirlineCode' THEN AirlineCode END DESC,
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
