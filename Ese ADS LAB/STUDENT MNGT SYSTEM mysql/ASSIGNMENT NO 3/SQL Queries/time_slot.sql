create table time_slot(
	time_slot_id int unique,
    day_ varchar(10),
    start_time time,
    end_time time,
    primary key(time_slot_id, day_, start_time)
);