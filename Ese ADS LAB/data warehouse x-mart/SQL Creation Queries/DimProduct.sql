create table DimProduct(
ProductKey int primary key,
ProductAltKey varchar(10)not null,
ProductName varchar(100),
ProductActualCost decimal(10, 2),
ProductSalesCost decimal(10, 2)
);