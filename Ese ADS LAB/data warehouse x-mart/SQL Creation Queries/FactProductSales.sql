Create Table FactProductSales(
	TransactionId bigint not null primary key,
	SalesInvoiceNumber int not null,
	SalesDateKey int,
	SalesTimeKey int,
	SalesTimeAltKey int,
	StoreID int not null,
	CustomerID int not null,
	ProductID int not null,
	SalesPersonID int not null,
	Quantity float,
	TotalAmount decimal(10, 2),
	DateKey date,
    TimeKey time,
    
    foreign key (StoreID) references DimStores(StoreID),
    foreign key (CustomerID) references DimCustomer(CustomerID),
    foreign key (ProductID) references DimProduct(ProductKey),
    foreign key (SalesPersonID) references DimSalesPerson(SalesPersonID),
    foreign key (SalesDateKey) references DimDate(DateKey),
	foreign key (SalesTimeKey) references DimTime(TimeKey)
)