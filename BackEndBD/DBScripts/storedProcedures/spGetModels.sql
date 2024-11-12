-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetModels(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdBrand CHAR(36),
    IN p_SitsNumber INT,
    IN p_Tare INT,
    IN p_GrossWeight INT,
    IN p_Payload INT,
    IN p_FlightCrewNumber INT,
    IN p_FuelQuantity INT,
    IN p_ModelYear INT,
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
    SET p_IdBrand = IFNULL(p_IdBrand, NULL);
    SET p_SitsNumber = IFNULL(p_SitsNumber, NULL);
    SET p_Tare = IFNULL(p_Tare, NULL);
    SET p_GrossWeight = IFNULL(p_GrossWeight, NULL);
    SET p_Payload = IFNULL(p_Payload, NULL);
    SET p_FlightCrewNumber = IFNULL(p_FlightCrewNumber, NULL);
    SET p_FuelQuantity = IFNULL(p_FuelQuantity, NULL);
    SET p_ModelYear = IFNULL(p_ModelYear, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'id_model');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);

    -- Query principal
    SELECT
        *
    FROM model
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
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_model' THEN id_model END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_model' THEN id_model END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_brand' THEN id_brand END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_brand' THEN id_brand END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sits_number' THEN sits_number END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sits_number' THEN sits_number END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'tare' THEN tare END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'tare' THEN tare END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'gross_weight' THEN gross_weight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'gross_weight' THEN gross_weight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'payload' THEN payload END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'payload' THEN payload END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'flight_crew_number' THEN flight_crew_number END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'flight_crew_number' THEN flight_crew_number END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'fuel_quantity' THEN fuel_quantity END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'fuel_quantity' THEN fuel_quantity END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'model_year' THEN model_year END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'model_year' THEN model_year END DESC,
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
