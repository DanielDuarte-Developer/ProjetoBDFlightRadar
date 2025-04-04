-- Flight Control Data Base Initializer

drop database if exists flight_radar;

create database if not exists flight_radar;
use flight_radar;

create table country (
Id VARCHAR(100) primary key,
CountryName nvarchar(100),
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table airport (
Id VARCHAR(100) primary key,
IdCountry VARCHAR(100),
foreign key (IdCountry) references country(Id),
AirportName nvarchar(100) unique,
AirportCode char(3) unique,
LocationName nvarchar(50),
LocationLatitude int,
LocationLongitude int,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table airline (
Id VARCHAR(100) primary key,
IdCountry VARCHAR(100),
foreign key (IdCountry) references country(Id),
AirlineName nvarchar(100) unique,
AirlineCode char(10) unique,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table observation (
Id VARCHAR(100) primary key,
ObservationText nvarchar(255),
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table brand (
Id VARCHAR(100) primary key,
IdCountry VARCHAR(100),
foreign key (IdCountry) references country(Id),
BrandName nvarchar(100) unique,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table model (
Id VARCHAR(100) primary key,
IdBrand VARCHAR(100),
foreign key (IdBrand) references brand(Id),
ModelName nvarchar(100),
ModelImage nvarchar(1000),
SitsNumber int,
Tare int,
GrossWeight int,
Payload int,
FlightCrewNumber int,
FuelQuantity int,
ModelYear int,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table airplane (
Id VARCHAR(100) primary key,
IdModel VARCHAR(100),
IdAirline VARCHAR(100),
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100),
foreign key (IdAirline) references airline(Id),
foreign key (IdModel) references model(Id)
);

create table flight (
Id VARCHAR(100) primary key,
IdObservation VARCHAR(100),
IdAirplane VARCHAR(100),
foreign key (IdAirplane) references airplane(Id),
foreign key (IdObservation) references observation(Id),
FlightCode char(7) unique,
Passengers int,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100)
);

create table airport_flight (
Id VARCHAR(100) primary key ,
IdAirport VARCHAR(100),
IdFlight VARCHAR(100),
TimeMarker timestamp,
IsDelete int,
SysStatus nvarchar(255),
SysCreateDate datetime,   
SysCreateUserId VARCHAR(100),
SysModifyDate datetime,
SysModifyUserId VARCHAR(100),
foreign key (IdAirport) references airport(Id),
foreign key (IdFlight) references flight(Id)
);

-- Teste Records
-- Inserting data into the `country` table
INSERT INTO country (Id, CountryName, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('C1', 'United States', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('C2', 'Canada', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('C3', 'Germany', 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `airport` table
INSERT INTO airport (Id, IdCountry, AirportName, AirportCode, LocationName, LocationLatitude, LocationLongitude, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('A1', 'C1', 'John F. Kennedy International Airport', 'JFK', 'New York', 40, -73, 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('A2', 'C1', 'Los Angeles International Airport', 'LAX', 'Los Angeles', 34, -118, 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('A3', 'C2', 'Toronto Pearson International Airport', 'YYZ', 'Toronto', 43, -79, 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `airline` table
INSERT INTO airline (Id, IdCountry, AirlineName, AirlineCode, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('AL1', 'C1', 'American Airlines', 'AA', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('AL2', 'C2', 'Air Canada', 'AC', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('AL3', 'C3', 'Lufthansa', 'LH', 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `observation` table
INSERT INTO observation (Id, ObservationText, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('O1', 'Routine check', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('O2', 'Emergency landing', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('O3', 'Flight delay', 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `brand` table
INSERT INTO brand (Id, IdCountry, BrandName, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('B1', 'C1', 'Boeing', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('B2', 'C2', 'Airbus', 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `model` table
INSERT INTO model (Id, IdBrand, ModelName, ModelImage, SitsNumber, Tare, GrossWeight, Payload, FlightCrewNumber, FuelQuantity, ModelYear, IsDelete, SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES 
	('M1', 'B1', 'Boeing 737', 'boeing737.jpg', 160, 41000, 79000, 20000, 2, 2000, 2019, 0, 'Active', GETDATE(), 'admin', GETDATE(), 'admin'),
	('M2', 'B2', 'Airbus A320', 'airbusa320.jpg', 150, 37000, 75000, 18000, 2, 1800, 2020, 0, 'Active', GETDATE(), 'admin', GETDATE(), 'admin');

-- Inserting data into the `airplane` table
INSERT INTO airplane (Id, IdModel, IdAirline, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('P1', 'M1', 'AL1', 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('P2', 'M2', 'AL2', 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `flight` table
INSERT INTO flight (Id, IdObservation, IdAirplane, FlightCode, Passengers, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('F1', 'O1', 'P1', 'AA100', 150, 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('F2', 'O2', 'P2', 'AC200', 180, 0,'Active', NOW(), 'admin', NOW(), 'admin');

-- Inserting data into the `airport_flight` table
INSERT INTO airport_flight (Id, IdAirport, IdFlight, TimeMarker, IsDelete,SysStatus, SysCreateDate, SysCreateUserId, SysModifyDate, SysModifyUserId)
VALUES
    ('AF1', 'A1', 'F1', NOW(), 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('AF2', 'A2', 'F1', NOW(), 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('AF3', 'A2', 'F2', NOW(), 0,'Active', NOW(), 'admin', NOW(), 'admin'),
    ('AF4', 'A3', 'F2', NOW(), 0,'Active', NOW(), 'admin', NOW(), 'admin');
