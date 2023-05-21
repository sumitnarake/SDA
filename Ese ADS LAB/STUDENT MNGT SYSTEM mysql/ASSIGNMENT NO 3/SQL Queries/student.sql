create table student(
	id int auto_increment,
    name_ varchar(30),
    dept_name varchar(20),
    tot_cred int,
    primary key(id),
    foreign key (dept_name) references department(dept_name)
);