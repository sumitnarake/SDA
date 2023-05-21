create table DimStores(
StoreID int primary key,
StoreAltID varchar(10) not null,
StoreName varchar(50),
StoreLocation varchar(100),
City varchar(50),
State varchar(50),
Country varchar(50)
);