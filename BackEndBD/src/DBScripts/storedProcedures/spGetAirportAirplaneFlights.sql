-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-28>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirportAirplaneFlights(
    -- DB atributes
    IN p_IdAirport CHAR(36),
    IN p_IdFlight CHAR(36),
    IN p_IdAirplane CHAR(36),
    IN p_Departure DateTime,
    IN p_Arrival DateTime,
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
    SET p_IdAirport = IFNULL(p_IdAirport, NULL);
    SET p_IdFlight = IFNULL(p_IdFlight, NULL);
    SET p_IdAirplane = IFNULL(p_IdAirplane, NULL);
    SET p_Departure = IFNULL(p_Departure, NULL);
    SET p_Arrival = IFNULL(p_Arrival, NULL);
    SET p_UserId = IFNULL(p_UserId, NULL);
    SET p_Status = IFNULL(p_Status, NULL);
    SET p_SortField = IFNULL(p_SortField, 'id_airplane_flight');
    SET p_SortOrder = IFNULL(p_SortOrder, 'ASC');
    SET p_Skip = IFNULL(p_Skip, 0);
    SET p_Take = IFNULL(p_Take, 1000000);
    
    -- Query principal
    SELECT
        *
    FROM airplane_flight
    WHERE (p_IdAirport IS NULL OR id_airport = p_IdAirport)
        AND (p_IdFlight IS NULL OR id_flight = p_IdFlight)
        AND (p_IdAirplane IS NULL OR id_plane = p_IdAirplane)
        AND (p_Departure IS NULL OR departure = p_Departure)
        AND (p_Arrival IS NULL OR arrival = p_Arrival)
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airport' THEN id_airport END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airport' THEN id_airport END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_flight' THEN id_flight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_flight' THEN id_flight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_plane' THEN id_plane END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_plane' THEN id_plane END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'departure' THEN departure END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'departure' THEN departure END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'arrival' THEN arrival END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'arrival' THEN arrival END DESC,
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
