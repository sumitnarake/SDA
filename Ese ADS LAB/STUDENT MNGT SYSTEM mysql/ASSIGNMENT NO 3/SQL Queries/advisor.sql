create table advisor(
	s_id int,
    i_id int,
    primary key(s_id),
    foreign key (s_id) references student(id),
    foreign key (i_id) references instructor(id)
);