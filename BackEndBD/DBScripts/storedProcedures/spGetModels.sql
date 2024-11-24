-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetModels(
    -- DB atributes
    IN p_Id CHAR(36),
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
    SET p_SortField = IFNULL(p_SortField, 'Id');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);

    -- Query principal
    SELECT
        *
    FROM model
    WHERE (p_Id IS NULL OR Id = p_Id)
        AND (p_IdBrand IS NULL OR IdBrand = p_IdBrand)
        AND (p_SitsNumber IS NULL OR SitsNumber = p_SitsNumber)
        AND (p_Tare IS NULL OR Tare = p_Tare)
        AND (p_GrossWeight IS NULL OR GrossWeight = p_GrossWeight)
        AND (p_Payload IS NULL OR Payload = p_Payload)
        AND (p_FlightCrewNumber IS NULL OR FlightCrewNumber = p_FlightCrewNumber)
        AND (p_FuelQuantity IS NULL OR FuelQuantity = p_FuelQuantity)
        AND (p_ModelYear IS NULL OR ModelYear = p_ModelYear)
        AND (p_UserId IS NULL OR SysCreateUserId = p_UserId)
        AND (p_Status IS NULL OR SysStatus = p_Status)
        AND (SysStatus != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Id' THEN Id END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Id' THEN Id END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'IdBrand' THEN IdBrand END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'IdBrand' THEN IdBrand END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'SitsNumber' THEN SitsNumber END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'SitsNumber' THEN SitsNumber END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Tare' THEN Tare END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Tare' THEN Tare END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'GrossWeight' THEN GrossWeight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'GrossWeight' THEN GrossWeight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'Payload' THEN Payload END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'Payload' THEN Payload END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'FlightCrewNumber' THEN FlightCrewNumber END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'FlightCrewNumber' THEN FlightCrewNumber END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'FuelQuantity' THEN FuelQuantity END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'FuelQuantity' THEN FuelQuantity END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'ModelYear' THEN ModelYear END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'ModelYear' THEN ModelYear END DESC,
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
