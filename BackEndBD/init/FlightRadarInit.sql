-- Flight Control Data Base Initializer

drop database if exists flight_radar;

create database if not exists flight_radar;
use flight_radar;

create table country (
id_country int auto_increment primary key,
country_name varchar(100)
);

create table airport (
id_airport int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
airport_name varchar(100) unique,
airport_code char(3) unique,
location_name varchar(50),
location_latitude int,
location_longitude int
);

create table flight (
id_flight int auto_increment primary key,
flight_code char(7) unique,
flight_state varchar(100),
passengers int
);

create table airline (
id_airline int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
airline_name varchar(100) unique,
airline_code char(2) unique
);

create table brand (
id_brand int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
brand_name varchar(100) unique
);

create table model (
id_model int auto_increment primary key,
id_brand int,
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
id_plane int auto_increment primary key,
id_model int,
id_airline int,
foreign key (id_airline) references airline(id_airline),
foreign key (id_model) references model(id_model)
);

create table airport_airplane_flight (
id_airport int,
id_flight int,
id_plane int,
foreign key (id_airport) references airport(id_airport),
foreign key (id_flight) references flight(id_flight),
foreign key (id_plane) references airplane(id_flight),
primary key (id_airport, id_flight, id_plane),
departure timestamp,
arrival timestamp
);

