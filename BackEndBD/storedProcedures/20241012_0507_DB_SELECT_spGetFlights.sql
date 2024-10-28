-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
DELIMITER $$

CREATE PROCEDURE spGetFlights(
    -- DB atributes
    IN p_Id CHAR(36) DEFAULT NULL,
    IN p_FlightCode VARCHAR(10) DEFAULT NULL,
    IN p_Passengers INT DEFAULT NULL,
    IN p_State VARCHAR(40) DEFAULT NULL,
    -- Control atributes
    IN p_UserId VARCHAR(255) DEFAULT NULL,
    IN p_Status VARCHAR(255) DEFAULT NULL,
    IN p_SortField VARCHAR(50) DEFAULT 'id_flight',
    IN p_SortOrder VARCHAR(4) DEFAULT 'ASC',
    IN p_Skip INT DEFAULT 0,
    IN p_Take INT DEFAULT 1000000
)
BEGIN
    -- Query principal
    SELECT
        *
    FROM flight
    WHERE (p_Id IS NULL OR id_flight = p_Id)
        AND (p_FlightCode IS NULL OR code = p_FlightCode)
        AND (p_State IS NULL OR flight_state = p_State)
        AND (p_Passengers IS NULL OR passengers = p_Passengers) 
        AND (p_UserId IS NULL OR sys_create_user_id = p_UserId)
        AND (p_Status IS NULL OR sys_status = p_Status)
        AND (sys_status != 'X')
    -- Ordenação com CASE
    ORDER BY 
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'id_flight' THEN id_flight END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'id_flight' THEN id_flight END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'code' THEN code END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'code' THEN code END DESC,
        CASE WHEN p_SortOrder = 'ASC' AND p_SortField = 'flight_state' THEN flight_state END ASC,
        CASE WHEN p_SortOrder = 'DESC' AND p_SortField = 'flight_state' THEN flight_state END DESC,
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
