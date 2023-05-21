delimiter //

create trigger insert_dt 
before insert on dimdate for each row
begin
	DECLARE v_WeekOfMonth INT;
	DECLARE v_CurrentYear INT;
	DECLARE v_CurrentQuarter INT;
	DECLARE v_CurrentDate DATE;
    DECLARE v_CNTR INT; 
    DECLARE v_POS INT; 
    DECLARE v_STARTYEAR INT; 
    DECLARE v_ENDYEAR INT;
    DECLARE v_MINDAY INT;
    DECLARE v_Month varchar(2);
    DECLARE v_DayofWeekUSA char(1);
    DECLARE  v_DayOfMonth varchar(2);
    DECLARE v_DayOfWeekInMonth varchar(2);
    DECLARE v_HolidayUSA varchar(50);
	DECLARE v_HolidayUK varchar(50);
    
    -- Fiscal Year Variables
	DECLARE v_FiscalDayOfYear INT;
    DECLARE v_min_sd DATE;
    DECLARE v_max_ed DATE;
    DECLARE v_min_sd_fq DATE;
    DECLARE v_max_ed_fq DATE;
    DECLARE v_min_sd_yr DATE;
    DECLARE v_max_ed_yr DATE;
    
    -- Setting variables
    SET v_CurrentDate = new.date;
	SET v_CurrentYear = YEAR( v_CurrentDate);
	SET v_CurrentQuarter = QUARTER( v_CurrentDate);
    
    -- Inserting values
	SET New.FullDateUK = DATE_FORMAT(v_CurrentDate,'%d/%m/%Y');
	SET New.FullDateUSA = DATE_FORMAT(v_CurrentDate,'%m/%d/%Y');
	SET New.DayOfMonth = DAY( v_CurrentDate); SET  v_DayOfMonth=DAY( v_CurrentDate);
	SET New.DaySuffix = CASE 
			WHEN DAY(v_CurrentDate) IN (11,12,13)
			THEN CONCAT(CAST(DAY(v_CurrentDate) AS CHAR) , 'th')
			WHEN RIGHT(DAY(v_CurrentDate),1) = 1
			THEN CONCAT(CAST(DAY(v_CurrentDate) AS CHAR) , 'st')
			WHEN RIGHT(DAY(v_CurrentDate),1) = 2
			THEN CONCAT(CAST(DAY(v_CurrentDate) AS CHAR) , 'nd')
			WHEN RIGHT(DAY(v_CurrentDate),1) = 3
			THEN CONCAT(CAST(DAY(v_CurrentDate) AS CHAR) , 'rd')
			ELSE CONCAT(CAST(DAY(v_CurrentDate) AS CHAR) , 'th') 
		END;
	SET New.DayName = DAYNAME( v_CurrentDate);
	SET New.DayOfWeekUSA = DAYOFWEEK( v_CurrentDate); SET v_DayofWeekUSA=DAYOFWEEK( v_CurrentDate);
	SET New.DayOfWeekUK = CASE DAYOFWEEK( v_CurrentDate)
			WHEN 1 THEN 7
			WHEN 2 THEN 1
			WHEN 3 THEN 2
			WHEN 4 THEN 3
			WHEN 5 THEN 4
			WHEN 6 THEN 5
			WHEN 7 THEN 6
			END;
	SET New.DayOfWeekInMonth = MONTH(v_CurrentDate); SET v_DayOfWeekInMonth= MONTH(v_CurrentDate);
	SET New.DayOfWeekInYear = WEEKDAY(v_CurrentDate);
	SET New.DayOfQuarter = CAST(CEILING(CAST(month(v_CurrentDate) AS decimal(9,2)) / 3) AS char(1));
	SET New.DayOfYear = DAYOFYEAR(v_CurrentDate);
	SET New.WeekOfMonth = WEEK(v_CurrentDate, 5) - WEEK(DATE_SUB(v_CurrentDate, INTERVAL DAYOFMONTH(v_CurrentDate) - 1 DAY), 5) + 1;
	SET New.WeekOfQuarter = (TIMESTAMPDIFF(DAY, TIMESTAMPADD(QUARTER, TIMESTAMPDIFF(QUARTER, '1900-01-01', v_CurrentDate), ADDDATE('1900-01-01', 0)), v_CurrentDate) / 7) + 1;
	SET New.WeekOfYear = weekofyear( v_CurrentDate);
	SET New.Month = MONTH( v_CurrentDate); SET v_Month = MONTH( v_CurrentDate);
	SET New.MonthName = MONTHNAME( v_CurrentDate);
	SET New.MonthOfQuarter = CASE
			WHEN MONTH( v_CurrentDate) IN (1, 4, 7, 10) THEN 1
			WHEN MONTH( v_CurrentDate) IN (2, 5, 8, 11) THEN 2
			WHEN MONTH( v_CurrentDate) IN (3, 6, 9, 12) THEN 3
			END;
	SET New.Quarter = QUARTER( v_CurrentDate);
	SET New.QuarterName = CASE QUARTER( v_CurrentDate)
			WHEN 1 THEN 'First'
			WHEN 2 THEN 'Second'
			WHEN 3 THEN 'Third'
			WHEN 4 THEN 'Fourth'
			END;
	SET New.Year = YEAR( v_CurrentDate);
	SET New.YearName = CONCAT('CY ' , CONVERT( YEAR( v_CurrentDate), CHAR));
	SET New.MonthYear = CONCAT(LEFT(MONTHNAME( v_CurrentDate), 3) , '-' , YEAR( v_CurrentDate));
	SET New.MMYYYY = Concat(RIGHT(Concat('0' , CONVERT( MONTH( v_CurrentDate), CHAR)),2), CONVERT( YEAR( v_CurrentDate), CHAR));
	SET New.FirstDayOfMonth = CAST(DATE_FORMAT(v_CurrentDate ,'%Y-%m-01') as DATE);
	SET New.LastDayOfMonth = last_day(v_CurrentDate);
	SET New.FirstDayOfQuarter = TIMESTAMPADD(QUARTER, TIMESTAMPDIFF(QUARTER, '1900-01-01', v_CurrentDate), ADDDATE('1900-01-01', 0));
	SET New.LastDayOfQuarter = MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL QUARTER(CURDATE()) QUARTER - INTERVAL 1 DAY;
	SET New.FirstDayOfYear = concat(cast(year( '2023-03-18') as char(4)), '-01-01');
	SET New.LastDayOfYear = concat(cast(year( '2023-03-18') as char(4)), '-12-31');
	SET New.IsWeekday = CASE DAYOFWEEK( v_CurrentDate)
							WHEN 1 THEN 0
							WHEN 2 THEN 1
							WHEN 3 THEN 1
							WHEN 4 THEN 1
							WHEN 5 THEN 1
							WHEN 6 THEN 1
							WHEN 7 THEN 0
						END;
	SET New.HolidayUSA = CASE
							WHEN v_Month=11 and v_DayofWeekUSA='Thursday' and v_DayOfWeekInMonth=4 THEN 'Thanksgiving Day'
							WHEN v_Month=12 AND v_DayOfMonth=25 THEN 'Christmas Day'
							WHEN v_Month=7 AND v_DayOfMonth=4 THEN 'Independence Day'
							WHEN v_Month=1 AND  v_DayOfMonth=1 THEN 'New Year''s Day'
							WHEN v_Month=2 AND  v_DayOfMonth=14 THEN 'Valentine''s Day'
							WHEN v_Month=3 AND  v_DayOfMonth=17 THEN 'Saint Patrick''s Day'
							WHEN v_Month=1 AND v_DayofWeekUSA='Monday' AND year(v_CurrentDate) >= 1983 AND v_DayOfWeekInMonth = 3 THEN 'Martin Luthor King Jr Day'
							WHEN v_Month=5 AND v_DayofWeekUSA = 'Sunday' AND v_DayOfWeekInMonth=2 THEN 'Mother''s Day'
							WHEN v_Month=6 AND v_DayofWeekUSA='Sunday' AND v_DayOfWeekInMonth=3 THEN 'Father''s Day'
							WHEN v_Month=10 AND  v_DayOfMonth=31 THEN 'Halloween'
						end; SET v_HolidayUSA = New.HolidayUSA;
            
    SET New.IsHolidayUSA = CASE 
								WHEN v_HolidayUSA IS NULL THEN 0 
								WHEN v_HolidayUSA IS NOT NULL THEN 1 
							END;

	SET New.HolidayUK = CASE
							WHEN v_Month=1 and  v_DayOfMonth=1 THEN 'New Year''s Day'
							WHEN v_Month=4 and  v_DayOfMonth=18 THEN 'Good Friday'
							WHEN v_Month=4 and  v_DayOfMonth=21 THEN 'Easter Monday'
							WHEN v_Month=5 and  v_DayOfMonth=5 THEN 'Early May Bank Holiday'
							WHEN v_Month=5 and  v_DayOfMonth=26 THEN 'Spring Bank Holiday'
							WHEN v_Month=8 and  v_DayOfMonth=25 THEN 'Summer Bank Holiday'
							WHEN v_Month=12 and  v_DayOfMonth=25 THEN 'Christmas Day'
							WHEN v_Month=12 and  v_DayOfMonth=26 THEN 'Boxing Day'
							WHEN v_Month=4 and  v_DayOfMonth=18 THEN 'Good Friday'
						end; SET v_HolidayUK = New.HolidayUK;
        
	SET New.IsHolidayUK = CASE 
								WHEN v_HolidayUK IS NULL THEN 0 
								WHEN v_HolidayUK IS NOT NULL THEN 1 
						  END;
    
    -- Setting the Fiscal values
    SET v_FiscalDayOfYear = CASE month(v_CurrentDate)
								WHEN 1 THEN 275 + day(v_CurrentDate)
								WHEN 2 THEN 306 + day(v_CurrentDate)
								WHEN 3 THEN 334 + day(v_CurrentDate)
								WHEN 4 THEN day(v_CurrentDate)
								WHEN 5 THEN 30 + day(v_CurrentDate)
								WHEN 6 THEN 61 + day(v_CurrentDate)
								WHEN 7 THEN 91 + day(v_CurrentDate)
								WHEN 8 THEN 122 + day(v_CurrentDate)
								WHEN 9 THEN 153 + day(v_CurrentDate)
								WHEN 10 THEN 183 + day(v_CurrentDate)
								WHEN 11 THEN 214 + day(v_CurrentDate)
								WHEN 12 THEN 244 + day(v_CurrentDate)
							END;
    
    SET New.FiscalDayOfYear = CASE is_leap_year(year(v_CurrentDate))
									WHEN 1 and month(v_CurrentDate)=3 THEN v_FiscalDayOfYear+1
                                    ELSE v_FiscalDayOfYear
								END;
	
	SET New.FiscalMonth = month(v_CurrentDate); -- No Changes in Fiscal Month. It is same as Calendar Month
	SET New.FiscalQuarter = CASE
								WHEN New.FiscalMonth BETWEEN 4 and 6 THEN 1
								WHEN New.FiscalMonth BETWEEN 7 and 9 THEN 2
								WHEN New.FiscalMonth BETWEEN 10 and 12 THEN 3
								WHEN New.FiscalMonth BETWEEN 1 and 3 THEN 4
							end;
	SET New.FiscalQuarterName = CASE New.FiscalQuarter
									WHEN 1 THEN 'First'
									WHEN 2 THEN 'Second'
									WHEN 3 THEN 'Third'
									WHEN 4 THEN 'Fourth'
								END;
	SET New.FiscalYear = CASE 
							WHEN month(v_CurrentDate) <= 3
								THEN CAST(year(v_CurrentDate)-1 as char)
							ELSE
								CAST(year(v_CurrentDate) as char)
						 END;
	SET New.FiscalYearName = CONCAT('FY ' , CONVERT( New.FiscalYear, CHAR));
    
    SET New.FiscalWeekOfYear = abs(floor(datediff(concat(New.FiscalYear, '-04-01'), v_CurrentDate)/7));
    
	SET New.FiscalMonthYear = CONCAT(CASE New.FiscalMonth
								WHEN 1 THEN 'Jan'
								WHEN 2 THEN 'Feb'
								WHEN 3 THEN 'Mar'
								WHEN 4 THEN 'Apr'
								WHEN 5 THEN 'May'
								WHEN 6 THEN 'Jun'
								WHEN 7 THEN 'Jul'
								WHEN 8 THEN 'Aug'
								WHEN 9 THEN 'Sep'
								WHEN 10 THEN 'Oct'
								WHEN 11 THEN 'Nov'
								WHEN 12 THEN 'Dec'
								END , '-' , CONVERT( New.FiscalYear, CHAR));
	SET New.FiscalMMYYYY = Concat(RIGHT(Concat('0' , CONVERT( New.FiscalMonth, CHAR)),2), CONVERT( New.FiscalYear, CHAR));
	SET New.FiscalFirstDayOfMonth = New.FirstDayOfMonth;
	SET New.FiscalLastDayOfMonth = New.LastDayOfMonth;
	SET New.FiscalFirstDayOfQuarter = CASE New.FiscalQuarter
										WHEN 1 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '04-01')
										WHEN 2 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '07-01')
										WHEN 3 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '10-01')
										WHEN 4 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '01-01')
									  END;
	SET New.FiscalLastDayOfQuarter = CASE New.FiscalQuarter
										WHEN 1 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '06-30')
										WHEN 2 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '09-30')
										WHEN 3 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '12-31')
										WHEN 4 THEN CONCAT(CONCAT(New.FiscalYear, '-'), '03-31')
									  END;
	SET New.FiscalFirstDayOfYear =  concat(New.FiscalYear, '-04-01');
	SET New.FiscalLastDayOfYear =  concat(New.FiscalYear, '-03-31');
    
end;