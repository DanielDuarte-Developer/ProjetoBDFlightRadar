-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetModels(
    -- DB atributes
    IN p_Id CHAR(36) DEFAULT NULL,
    IN p_IdBrand CHAR(36) DEFAULT NULL,
    IN p_SitsNumber INT DEFAULT NULL,
    IN p_Tare INT DEFAULT NULL,
    IN p_GrossWeight INT DEFAULT NULL,
    IN p_Payload INT DEFAULT NULL,
    IN p_FlightCrewNumber INT DEFAULT NULL,
    IN p_FuelQuantity INT DEFAULT NULL,
    IN p_ModelYear INT DEFAULT NULL,
    -- Control atributes
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'id_model',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM airport_flight
    WHERE (p_Id IS NULL OR id_model = p_Id)
        AND (p_IdBrand IS NULL OR id_brand = p_IdBrand)
        AND (p_SitsNumber IS NULL OR sits_number = p_SitsNumber)
        AND (p_Tare IS NULL OR tare = p_Tare)
        AND (p_GrossWeight IS NULL OR gross_weight = p_GrossWeight)
        AND (p_Payload IS NULL OR payload = p_Payload)
        AND (p_FlightCrewNumber IS NULL OR flight_crew_number = p_FlightCrewNumber)
        AND (p_FuelQuantity IS NULL OR fuel_quantity = p_FuelQuantity)
        AND (p_ModelYear IS NULL OR model_year = p_ModelYear)
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_model' THEN id_airline END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_model' THEN id_airline END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_brand' THEN id_country END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_brand' THEN id_country END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sits_number' THEN airline_name END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sits_number' THEN airline_name END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'tare' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'tare' THEN airline_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'gross_weight' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'gross_weight' THEN airline_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'payload' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'payload' THEN airline_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'flight_crew_number' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'flight_crew_number' THEN airline_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'fuel_quantity' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'fuel_quantity' THEN airline_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'model_year' THEN airline_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'model_year' THEN airline_code END DESC,
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
