use flight_radar;

DELIMITER $$

## Verifica se a tabela especificada contém registos de outras tabelas a ela associada
create function containsForeignValues(tableName varchar(36), tableId char(36))
returns bool

begin 
case tableName
when tableName = airport 
	then return exists (select IdAirport from airport_flight where IdAirport = tableId and (IdFlight != null));
when tableName = airplane 
	then return exists (select IdAirplane from airport_flight where IdAirplane = tableId and (IdFlight != null or IdAirport != null));
when tableName = country
	then return exists (select IdCountry from airport_flight where IdCountry = tableId and (IdFlight != null or IdAirport != null));
when tableName = flight
	then return false;
when tableName = airline
	then return exists (select IdAirline from airplane where IdAirline = tableId);
when tableName = model
	then return exists (select IdModel from airplane where IdModel= tableId);
when tableName = brand
	then return exists (select IdBrand from model where IdBrand = tableId);
when tableName = country
	then return exists (select IdCountry from airline natural join brand natural join airport where IdCountry = tableId);
else return true;
end case;
end $$

## Verifica se numa determinada tabela existe um atributo código com o valor especificado
create function nameAlreadyExists(tableName varchar(36), attributeName varchar(15), attributeNameValue varchar(100))
returns bool

begin
return exists (select attributeName from tableName where attributeName = attributeNameValue);
end $$

## Verifica se numa determinada tabela existe um atributo nome com o valor especificado
create function codeAlreadyExists(tableName varchar(36), attributeCode varchar(15), attributeCodeValue varchar(7))
returns bool

begin
return exists (select attributeCode from tableName where attributeCode = attributeCodeValue);
end $$

DELIMITER ;
