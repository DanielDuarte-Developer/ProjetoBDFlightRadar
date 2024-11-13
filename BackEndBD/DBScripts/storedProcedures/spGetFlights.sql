-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetFlights(
    -- DB atributes
    IN p_Id CHAR(32),
    IN p_IdObservation CHAR(32),
    IN p_IdAirplane CHAR(32),
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
    SET p_SortField = IFNULL(p_SortField, 'id_flight');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);

    -- Query principal
    SELECT
        *
    FROM flight
    WHERE (p_Id IS NULL OR id_flight = p_Id)
        AND (p_IdObservation IS NULL OR id_observation = p_IdObservation)
        AND (p_IdAirplane IS NULL OR id_airplane = p_IdAirplane)
        AND (p_FlightCode IS NULL OR flight_code = p_FlightCode)
        AND (p_Passengers IS NULL OR passengers = p_Passengers) 
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_flight' THEN id_flight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_flight' THEN id_flight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_observation' THEN id_observation END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_observation' THEN id_observation END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airplane' THEN id_airplane END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airplane' THEN id_airplane END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'flight_code' THEN flight_code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'flight_code' THEN flight_code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'passengers' THEN Passengers END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'passengers' THEN Passengers END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_status' THEN sys_status END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'sys_status' THEN sys_status END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'sys_create_date' THEN sys_create_dateEND ASC,
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
