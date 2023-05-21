CREATE TABLE DimTime ( 
	TimeKey int NOT NULL primary key auto_increment, 
	TimeAltKey int NOT NULL,
    Time time,
	Time30 varchar(8) NOT NULL, 
	Hour30 tinyint NOT NULL, 
	MinuteNumber tinyint NOT NULL, 
	SecondNumber tinyint NOT NULL, 
	TimeInSecond int NOT NULL, 
	HourlyBucket varchar(15) not null, 
	DayTimeBucketGroupKey int not null, 
	DayTimeBucket varchar(100) not null 
);