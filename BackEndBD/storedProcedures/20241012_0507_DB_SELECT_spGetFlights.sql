SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================
CREATE PROCEDURE [dbo].[spGetFlights]
	@Id UNIQUEIDENTIFIER = NULL,
    -- Verificar Atributos	
    --@FlightCode VARCHAR(10) = NULL,
    --@Departure VARCHAR(3) = NULL,
    --@Arrival VARCHAR(3) = NULL,
	@UserId VARCHAR(255) = NULL,
	@Status VARCHAR(255) = NULL,
	@SortField NVARCHAR(50) = 'Id',
	@SortOrder NVARCHAR(4) = 'ASC',
	@Skip INT = 0,
	@Take INT = 1000000
AS
SELECT
	*

FROM [dbo].[Flight]
WHERE (@Id IS NULL OR Id = @Id)
-- Verificar os atributos de ser null
	--AND (@RoomId IS NULL OR RoomId = @RoomId)
	 --AND (
            --(@startDateTime IS NULL AND @endDateTime IS NULL)
            --OR (@startDateTime IS NOT NULL AND @endDateTime IS NOT NULL AND startDateTime BETWEEN @startDateTime AND @endDateTime)
            --OR (@startDateTime IS NOT NULL AND @endDateTime IS NULL AND startDateTime >= @startDateTime)
            --OR (@startDateTime IS NULL AND @endDateTime IS NOT NULL AND startDateTime <= @endDateTime)
        --)
	AND (@UserId IS NULL OR SysCreateUserId = @UserId)
	AND (@Status IS NULL OR SysStatus = @Status)
	AND (SysStatus != 'X')
ORDER BY 
		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'Id' THEN [Id] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'Id' THEN [Id] END DESC,
		

		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'SysStatus' THEN [SysStatus] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'SysStatus' THEN [SysStatus] END DESC,
		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'SysCreateDate' THEN [SysCreateDate] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'SysCreateDate' THEN [SysCreateDate] END DESC,
		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'SysCreateUserId' THEN [SysCreateUserId] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'SysCreateUserId' THEN [SysCreateUserId] END DESC,
		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'SysModifyDate' THEN [SysModifyDate] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'SysModifyDate' THEN [SysModifyDate] END DESC,
		CASE WHEN @SortOrder = 'ASC' AND @SortField = 'SysModifyUserId' THEN [SysModifyUserId] END ASC,
		CASE WHEN @SortOrder = 'DESC' AND @SortField = 'SysModifyUserId' THEN [SysModifyUserId] END DESC
	OFFSET @Skip ROWS
	FETCH NEXT @Take ROWS ONLY
RETURN 0
