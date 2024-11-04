-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirlines(
    -- DB atributes
    IN p_Id CHAR(36),
    IN p_IdCountry CHAR(36),
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
    SET p_SortField = IFNULL(p_SortField, 'id_airline');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
 
    -- Query principal
    SELECT
        *
    FROM airline
    WHERE (p_Id IS NULL OR id_airline = p_Id)
        AND (p_IdCountry IS NULL OR id_country = p_IdCountry)
        AND (p_AirlineName IS NULL OR airline_name = p_AirlineName)
        AND (p_AirlineCode IS NULL OR airline_code = p_AirlineCode)
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airline' THEN id_airline END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airline' THEN id_airline END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_country' THEN id_country END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_country' THEN id_country END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'airline_name' THEN airline_name END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'airline_name' THEN airline_name END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'airline_code' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'airline_code' THEN airline_code END DESC,
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
