-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAiports(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdCountry CHAR(36),
    IN p_AirportName VARCHAR(30),
    IN p_AirportCode VARCHAR(30),
    IN p_LocationName VARCHAR(30)
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
    SET p_SortField = IFNULL(p_SortField, 'id_airport');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
    
    -- Query principal
    SELECT
        *
    FROM airport
    WHERE (p_Id IS NULL OR id_airport = p_Id)
        AND (p_IdCountry IS NULL OR id_country = p_IdCountry)
        AND (p_AirportName IS NULL OR airport_name = p_AirportName)
        AND (p_AirportCode IS NULL OR airport_code = p_AirportCode)
        AND (p_LocationName IS NULL OR location_name = p_LocationName)
        AND (p_LocationLatitude IS NULL OR location_latitude = p_LocationLatitude)
        AND (p_LocationLongitude IS NULL OR location_longitude = p_LocationLongitude)
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airport' THEN id_airport END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airport' THEN id_airport END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_country' THEN id_country END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_country' THEN id_country END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'airport_name' THEN airport_name END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'airport_name' THEN airport_name END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'airport_code' THEN airport_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'airport_code' THEN airport_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'location_name' THEN location_name END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'location_name' THEN location_name END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'location_latitude' THEN location_latitude END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'location_latitude' THEN location_latitude END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'location_longitude' THEN location_longitude END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'location_longitude' THEN location_longitude END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_status' THEN sys_status END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_status' THEN sys_status END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_create_date' THEN sys_create_date END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_create_date' THEN sys_create_date END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_create_user_id' THEN sys_create_user_id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_create_user_id' THEN sys_create_user_id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_modify_date' THEN sys_modify_date END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_modify_date' THEN sys_modify_date END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_modify_user_id' THEN sys_modify_user_id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_modify_user_id' THEN sys_modify_user_id END DESC
    -- Paginação com LIMIT e OFFSET
    LIMIT p_Take OFFSET p_Skip;
END $$
DELIMITER ;
