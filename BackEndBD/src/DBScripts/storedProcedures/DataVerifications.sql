use flight_radar;
DELIMITER $$

## Verifica se a tabela especificada contém registos de outras tabelas a ela associada
create function containsForeignValues(tableName varchar(36), tableId char(36))
returns bool

begin 
case tableName
when tableName = airport 
	then return exists (select id_aiport from airport_airplane_flight where id_airport = tableId and (id_flight != null or id_airplane != null));
when tableName = airplane 
	then return exists (select id_airplane from airport_airplane_flight where id_airplane = tableId and (id_flight != null or id_airport != null));
when tableName = country
	then return exists (select id_country from airport_airplane_flight where id_country = tableId and (id_flight != null or id_airport != null));
when tableName = flight
	then return false;
when tableName = airline
	then return exists (select id_airline from airplane where id_airline = tableId);
when tableName = model
	then return exists (select id_model from airplane where id_model = tableId);
when tableName = brand
	then return exists (select id_brand from model where id_brand = tableId);
when tableName = country
	then return exists (select id_country from airline natural join brand natural join airport where id_country = tableId);
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