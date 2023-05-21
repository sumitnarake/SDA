create table DimDate(	
		DateKey int primary key auto_increment, 
		date date,
		FullDateUK CHAR(10), -- Date in DD-MM-YYYY
		FullDateUSA CHAR(10),-- Date in MM-DD-YYYY
		DayOfMonth VARCHAR(2), -- Day number of Month
		DaySuffix VARCHAR(4), -- 1st, 2nd ,3rd, etc
		DayName VARCHAR(9), 
		DayOfWeekUSA CHAR(1),-- First Day Sunday=1 and Saturday=7
		DayOfWeekUK CHAR(1),-- First Day Monday=1 and Sunday=7
		DayOfWeekInMonth VARCHAR(2), -- 1st Monday or 2nd Monday in Month
		DayOfWeekInYear VARCHAR(2),
		DayOfQuarter VARCHAR(3),
		DayOfYear VARCHAR(3),
		WeekOfMonth VARCHAR(1), 
		WeekOfQuarter text(2),
		WeekOfYear VARCHAR(2),
		Month VARCHAR(2),
		MonthName VARCHAR(9),
		MonthOfQuarter VARCHAR(2),
		Quarter CHAR(1),
		QuarterName VARCHAR(9), -- First,Second, etc.
		Year CHAR(4),-- Year value of Date stored in Row
		YearName CHAR(7), -- Calendar Year (CY) 2022, 2023, etc.
		MonthYear CHAR(10), -- Jan-2023, Feb-2023
		MMYYYY CHAR(6),
		FirstDayOfMonth DATE,
		LastDayOfMonth DATE,
		FirstDayOfQuarter DATE,
		LastDayOfQuarter DATE,
		FirstDayOfYear DATE,
		LastDayOfYear DATE,
		IsHolidayUSA BIT, -- Flag 1=National Holiday, 0=No National Holiday
		IsWeekday BIT, -- 0=Week End ,1=Week Day
		HolidayUSA VARCHAR(50), -- Name of Holiday in US
		IsHolidayUK BIT null, -- Flag 1=National Holiday, 0=No National Holiday
		HolidayUK VARCHAR(50) null, -- Name of Holiday in UK
        FiscalDayOfYear VARCHAR(3),
		FiscalWeekOfYear VARCHAR(3),
		FiscalMonth VARCHAR(2),
		FiscalQuarter CHAR(1),
		FiscalQuarterName VARCHAR(9),
		FiscalYear CHAR(4),
		FiscalYearName CHAR(7),
		FiscalMonthYear CHAR(10),
		FiscalMMYYYY CHAR(6),
		FiscalFirstDayOfMonth DATE,
		FiscalLastDayOfMonth DATE,
		FiscalFirstDayOfQuarter DATE,
		FiscalLastDayOfQuarter DATE,
		FiscalFirstDayOfYear DATE,
		FiscalLastDayOfYear DATE
)