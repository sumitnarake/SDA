create table prereq(
	course_id varchar(6) unique,
    prereq_id int unique,
    primary key(course_id, prereq_id)
);