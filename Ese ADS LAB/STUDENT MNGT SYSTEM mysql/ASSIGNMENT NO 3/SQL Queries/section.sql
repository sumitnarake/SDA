create table section (
	course_id varchar(6),
    sec_id varchar(6) unique,
    semester int unique,
    year_ int unique,
    building varchar(20),
    room_number int,
    time_slot_id int,
    primary key(course_id, sec_id, semester, year_),
	foreign key (course_id) references course (course_id),
    foreign key (building) references classroom (building),
	foreign key (room_number) references classroom (room_number),
    foreign key (time_slot_id) references time_slot(time_slot_id)
);