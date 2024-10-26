-- Flight Control Data Base Initializer

drop database if exists flight_radar;

create database if not exists flight_radar;
use flight_radar;

create table country (
id_country int auto_increment primary key,
country_name varchar(100)
);

create table city (
id_city int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
city_name varchar(100) not null
);

create table airport (
id_airport int auto_increment primary key,
id_city int,
foreign key (id_city) references city(id_city),
airport_name varchar(100),
airport_code char(3)
);

create table flight (
id_flight int auto_increment primary key,
flight_code char(7),
state varchar(100),
passengers int
);

create table airport_flight (
id_airport int,
id_flight int,
foreign key (id_airport) references airport(id_airport),
foreign key (id_flight) references flight(id_flight),
primary key (id_airport, id_flight),
departure timestamp,
arrival timestamp
);

create table airline (
id_airline int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
airline_name varchar(100),
airline_code char(2)
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

create table brand (
id_brand int auto_increment primary key,
id_country int,
foreign key (id_country) references country(id_country),
brand_name varchar(100)
);

create table airplane (
id_plane int auto_increment primary key,
id_model int,
id_airline int,
foreign key (id_airline) references airline(id_airline),
foreign key (id_model) references model(id_model)
);

create table airplane_flight (
id_airport int,
id_flight int,
foreign key (id_airport) references airport(id_airport),
foreign key (id_flight) references flight(id_flight),
primary key(id_airport, id_flight),
departure timestamp,
arrival timestamp
);

