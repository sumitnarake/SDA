create table classroom(
	building varchar(20) unique,
    room_number int unique,
    capacity int,
    primary key(building, room_number)
);