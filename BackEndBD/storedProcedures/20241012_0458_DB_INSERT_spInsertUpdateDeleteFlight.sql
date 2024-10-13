DELIMITER $$
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Daniel Duarte>
-- Create date: <2024-10-12>
-- =============================================

CREATE PROCEDURE [dbo].[spInsertUpdateDeleteFlight]
    @Id UNIQUEIDENTIFIER OUTPUT
    -- Verificar Atributos
    --@FlightCode VARCHAR(10),
    --@Departure VARCHAR(3),
    --@Arrival VARCHAR(3),
    @Status NVARCHAR(MAX),
    IN distance INT
AS
IF @Id IS NOT NULL
    BEGIN
        IF @Status = 'X'
            BEGIN
				UPDATE [dbo].[Flight]
				SET 
					[SysStatus] = @Status,
					[SysModifyDate] = GETUTCDATE(),
					[SysModifyUserId] = @UserId
				WHERE [Id] = @Id
			END
        ELSE
			BEGIN
				UPDATE [dbo].[Flight]
				SET 
					-- Ver Atributos
					[SysStatus] = @Status,
					[SysModifyDate] = GETUTCDATE(),
					[SysModifyUserId] = @UserId
				WHERE [Id] = @Id AND [SysRowVersion] = @RowVersion
			END
		END
        INSERT INTO voos (flight_code, departure, arrival, distance)
        VALUES (flightCode, departure, arrival, distance);
    END $$
ELSE
	BEGIN
		SET @Id = NEWID()
		INSERT INTO [dbo].[Reservation]
		(
			-- Ver Atributos
			[SysStatus],
			[SysCreateDate],
			[SysCreateUserId],
			[SysModifyDate],
			[SysModifyUserId]
		)
		Values
		(
			-- Ver Atributos
			@Status,
			GETUTCDATE(),
			@UserId,
			GETUTCDATE(),
			@UserId
		)
	END

IF ( @@ROWCOUNT > 0 )
	BEGIN
		SELECT @Id
	END
ELSE
	BEGIN
		SELECT @Id = NULL
	END
DELIMITER ;