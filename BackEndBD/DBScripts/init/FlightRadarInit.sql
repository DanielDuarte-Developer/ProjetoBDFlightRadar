-- Flight Control Data Base Initializer

drop database if exists flight_radar;

create database if not exists flight_radar;
use flight_radar;

create table country (
id_country char(32) primary key,
country_name varchar(100)
);

create table airport (
id_airport char(32) primary key,
id_country char(32),
foreign key (id_country) references country(id_country),
airport_name varchar(100) unique,
airport_code char(3) unique,
location_name varchar(50),
location_latitude int,
location_longitude int
);

create table flight (
id_flight char(32) primary key,
id_observation char(32),
id_airplane char(32),
foreign key (id_airplane) references airplane(id_airplane),
foreign key (id_observation) references observation(id_flight),
flight_code char(7) unique,
passengers int
);

create table observation (
id_observation char(32) primary key,
observation_text varchar(255)
);

create table airline (
id_airline char(32) primary key,
id_country char(32),
foreign key (id_country) references country(id_country),
airline_name varchar(100) unique,
airline_code char(2) unique
);

create table brand (
id_brand char(32) primary key,
id_country char(32),
foreign key (id_country) references country(id_country),
brand_name varchar(100) unique
);

create table model (
id_model char(32) primary key,
id_brand char(32),
foreign key (id_brand) references brand(id_brand),
sits_number int,
tare int,
gross_weight int,
payload int,
flight_crew_number int,
fuel_quantity int,
model_year int
);

create table airplane (
id_plane char(32) primary key,
id_model char(32),
id_airline char(32),
foreign key (id_airline) references airline(id_airline),
foreign key (id_model) references model(id_model)
);

create table airport_flight (
id_airport char(32),
id_flight char(32),
foreign key (id_airport) references airport(id_airport),
foreign key (id_flight) references flight(id_flight),
primary key (id_airport, id_flight),
timeMarker timestamp
);

