create table department(
	dept_name varchar(20) unique,
    building varchar(20),
    budget decimal(10, 2),
    primary key(dept_name)
);