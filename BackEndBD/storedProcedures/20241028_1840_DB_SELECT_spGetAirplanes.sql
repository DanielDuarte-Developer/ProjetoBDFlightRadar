-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirplanes(
    -- DB atributes
    IN p_Id CHAR(36) DEFAULT NULL,
    IN p_IdBrand CHAR(36) DEFAULT NULL,
    IN p_IdAirline CHAR(36) DEFAULT NULL,
    -- Control atributes
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'id_plane',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM airplane
    WHERE (p_Id IS NULL OR id_plane = p_Id)
        AND (p_IdBrand IS NULL OR id_brand = p_IdBrand)
        AND (p_IdAirline IS NULL OR id_airline = p_IdAirline)
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_plane' THEN id_plane END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_plane' THEN id_plane END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_brand' THEN id_brand END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_brand' THEN id_brand END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_flight_company' THEN id_flight_company END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_flight_company' THEN id_flight_company END DESC,
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
