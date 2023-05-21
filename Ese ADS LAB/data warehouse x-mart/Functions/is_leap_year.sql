delimiter //

create function is_leap_year (yr int) returns int
reads SQL DATA
deterministic
begin
	declare flag int;
    
		if (yr%4=0 and yr%100!=0) or yr%400=0 then
			set flag = 1;
		else 
			set flag = 0;
		end if;
        
        return flag;
end; 