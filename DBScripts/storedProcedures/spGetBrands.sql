-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetBrands(
    -- DB atributes
    IN p_Id CHAR(36) DEFAULT NULL,
    IN p_IdCountry CHAR(36) DEFAULT NULL,
    IN p_BrandName NVARCHAR(100) DEFAULT NULL,
    -- Control atributes
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'id_brand',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM airport_flight
    WHERE (p_Id IS NULL OR id_brand = p_Id)
        AND (p_IdCountry IS NULL OR id_country = p_IdCountry)
        AND (p_BrandName IS NULL OR brand_name = p_BrandName) 
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_brand' THEN id_brand END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_brand' THEN id_brand END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_country' THEN id_country END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_country' THEN id_country END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'brand_name' THEN brand_name END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'brand_name' THEN brand_name END DESC,
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