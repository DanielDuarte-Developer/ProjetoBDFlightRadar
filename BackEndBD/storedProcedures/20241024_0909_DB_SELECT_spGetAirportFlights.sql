-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetAirportFlights(
    -- DB atributes
    IN p_Id CHAR(36) DEFAULT NULL,
    IN p_IdAirport CHAR(36) DEFAULT NULL,
    IN p_IdFlight CHAR(36) DEFAULT NULL,
    IN p_Departure DateTime DEFAULT NULL,
    IN p_Arrival DateTime DEFAULT NULL,
    -- Control atributes
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'Id',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM airport_flight
    WHERE (p_Id IS NULL OR id_airport_flight = p_Id)
        AND (p_IdAirport IS NULL OR id_airport = p_IdAirport)
        AND (p_IdFlight IS NULL OR id_flight = p_IdFlight)
        AND (
                (p_Departure IS NULL AND p_Arrival IS NULL)
                OR (p_Departure IS NOT NULL AND p_Arrival IS NOT NULL AND departure BETWEEN p_Departure AND p_Arrival)
                OR (p_Departure IS NOT NULL AND p_Arrival IS NULL AND departure >= p_Departure)
                OR (p_Departure IS NULL AND p_Arrival IS NOT NULL AND departure <= p_Arrival)
            )
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airport_flight' THEN id_airport_flight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airport_flight' THEN id_airport_flight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_airport' THEN id_airport END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_airport' THEN id_airport END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_flight' THEN id_flight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_flight' THEN id_flight END DESC,
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
