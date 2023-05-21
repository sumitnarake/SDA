create table teaches(
	id int,
    course_id varchar(6),
    sec_id varchar(6),
    semester int,
    year_ int,
    primary key(id, course_id, sec_id, semester, year_),
    foreign key (id) references instructor(id),
    foreign key (course_id) references section(course_id),
	foreign key (sec_id) references section(sec_id),
    foreign key (semester) references section(semester),
    foreign key (year_) references section(year_)
);