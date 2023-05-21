create table course(
	course_id varchar(20) unique,
    title varchar(20),
    dept_name varchar(20),
    credits int,
    primary key(course_id)
);