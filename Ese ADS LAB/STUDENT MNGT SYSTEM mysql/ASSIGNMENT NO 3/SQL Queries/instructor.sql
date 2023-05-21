create table instructor(
	id int auto_increment,
    name_ varchar(30),
    dept_name varchar(20),
    salary decimal(10, 2),
    primary key (id),
    foreign key (dept_name) references department(dept_name) 
);