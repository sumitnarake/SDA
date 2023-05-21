delimiter //

create trigger insert_tm
before insert on dimtime
for each row
begin
	DECLARE v_CurrentTime TIME;
	DECLARE v_hour INTEGER; 
	DECLARE v_minute INTEGER; 
	DECLARE v_second INTEGER; 
	DECLARE v_TimeAltKey INTEGER; 
	DECLARE v_TimeInSecond INTEGER; 
	DECLARE v_Time30 varchar(25); 
	DECLARE v_Hour30 varchar(4); 
	DECLARE v_Minute30 varchar(4); 
	DECLARE v_Second30 varchar(4); 
	DECLARE v_HourlyBucket varchar(15); 
	DECLARE v_HourBucketGroupKey int; 
	DECLARE v_DayTimeBucket varchar(100); 
	DECLARE v_DayTimeBucketGroupKey int; 

	-- Setting the variables
    SET v_CurrentTime = New.Time;
    
	SET v_hour = HOUR(v_CurrentTime);
	if (v_hour < 10 ) then 
		set v_Hour30 = '0' + cast( v_hour as char(10)); 
	else 
		set v_Hour30 = v_hour; 
	end if;
    
    set v_HourlyBucket= CONCAT(v_Hour30,':00' ,'-' ,v_Hour30,':59'); 
    
    set v_minute = minute(v_CurrentTime);
    set v_second = second(v_CurrentTime);
    set v_TimeAltKey = v_hour *10000 +v_minute*100 +v_second; 
	set v_TimeInSecond =v_hour * 3600 + v_minute *60 +v_second;
    
    if v_minute <10 then 
		set v_Minute30 = '0' + cast( v_minute as char(10) ); 
	else 
		set v_Minute30 = v_minute; 
	end if; 
    
	if v_second <10 then 
		set v_Second30 = '0' + cast( v_second as char(10) ); 
	else 
		set v_Second30 = v_second; 
	end if; 

	set v_Time30 = CONCAT(v_Hour30 ,':',v_Minute30 ,':',v_Second30); 
    
    SET v_DayTimeBucketGroupKey = CASE 
			WHEN (v_TimeAltKey >= 00000 AND v_TimeAltKey <= 25959) THEN 0 
			WHEN (v_TimeAltKey >= 30000 AND v_TimeAltKey <= 65959) THEN 1 
			WHEN (v_TimeAltKey >= 70000 AND v_TimeAltKey <= 85959) THEN 2 
			WHEN (v_TimeAltKey >= 90000 AND v_TimeAltKey <= 115959) THEN 3 
			WHEN (v_TimeAltKey >= 120000 AND v_TimeAltKey <= 135959)THEN 4 
			WHEN (v_TimeAltKey >= 140000 AND v_TimeAltKey <= 155959)THEN 5 
			WHEN (v_TimeAltKey >= 50000 AND v_TimeAltKey <= 175959) THEN 6 
			WHEN (v_TimeAltKey >= 180000 AND v_TimeAltKey <= 235959)THEN 7 
			WHEN (v_TimeAltKey >= 240000) THEN 8 
		END; 

	SET v_DayTimeBucket = CASE 
		WHEN (v_TimeAltKey >= 00000 AND v_TimeAltKey <= 25959)
			THEN 'Late Night (00:00 AM To 02:59 AM)' 
		WHEN (v_TimeAltKey >= 30000 AND v_TimeAltKey <= 65959)
			THEN 'Early Morning(03:00 AM To 6:59 AM)' 
		WHEN (v_TimeAltKey >= 70000 AND v_TimeAltKey <= 85959)
			THEN 'AM Peak (7:00 AM To 8:59 AM)' 
		WHEN (v_TimeAltKey >= 90000 AND v_TimeAltKey <= 115959)
			THEN 'Mid Morning (9:00 AM To 11:59 AM)' 
		WHEN (v_TimeAltKey >= 120000 AND v_TimeAltKey <= 135959)
			THEN 'Lunch (12:00 PM To 13:59 PM)' 
		WHEN (v_TimeAltKey >= 140000 AND v_TimeAltKey <= 155959)
			THEN 'Mid Afternoon (14:00 PM To 15:59 PM)' 
		WHEN (v_TimeAltKey >= 50000 AND v_TimeAltKey <= 175959)
			THEN 'PM Peak (16:00 PM To 17:59 PM)' 
		WHEN (v_TimeAltKey >= 180000 AND v_TimeAltKey <= 235959)
			THEN 'Evening (18:00 PM To 23:59 PM)' 
		END;
	
    -- Setting the original values
	SET New.TimeAltKey = v_TimeAltKey; 
	SET New.Time30 = v_Time30; 
	SET New.Hour30 = v_hour;
	SET New.MinuteNumber = v_minute; 
	SET New.SecondNumber = v_second; 
	SET New.TimeInSecond = v_TimeInSecond;
	SET New.HourlyBucket = v_HourlyBucket; 
	SET New.DayTimeBucketGroupKey = v_DayTimeBucketGroupKey; 
	SET New.DayTimeBucket = v_DayTimeBucket;
    
end;