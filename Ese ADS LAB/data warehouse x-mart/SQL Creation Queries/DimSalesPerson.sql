create table DimSalesPerson(
SalesPersonID int primary key,
SalesPersonAltID varchar(10)not null,
SalesPersonName varchar(100),
StoreID int,
City varchar(50),
State varchar(50),
Country varchar(50)
)