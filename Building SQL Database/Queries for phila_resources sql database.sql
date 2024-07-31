SELECT * FROM elementary_school_metric_scores

SELECT * FROM high_school_metric_scores

SELECT * FROM ktoeight_school_metric_scores

SELECT * FROM middle_school_metric_scores

SELECT * FROM "School_List"

SELECT * FROM new_geo_schools_df

SELECT * FROM "PoliceLocation"

SELECT * FROM "IncidentsTimePlace" 

SELECT * FROM "Incidents"

SELECT * FROM "Districts"

------Police Data Analysis---------------------------------

---1. List the District_PSA, , first name, sex, and salary of each employee.
SELECT i."District_PSA", i."UCR_Code", i."General_Crime_Category", i."Crime_Group"
FROM "IncidentsTimePlace" i

--2. List the frequency counts, in descending order, of General_Crime_Category (that is, how many of each crime).
SELECT "General_Crime_Category", COUNT("General_Crime_Category") AS "Frequency"
FROM "IncidentsTimePlace"
GROUP BY "General_Crime_Category"
ORDER BY COUNT("General_Crime_Category") DESC;

--3. List the frequency counts, in descending order, of General_Crime_Category and Date (that is, how many of each crime).
SELECT 
    "Dispatch_Date",
    "General_Crime_Category", 
    COUNT("General_Crime_Category") AS "Frequency"
FROM 
    "IncidentsTimePlace"
GROUP BY 
    "Dispatch_Date", "General_Crime_Category"
ORDER BY 
    "Dispatch_Date", COUNT("General_Crime_Category") DESC;

--4.  List the frequency counts, in descending order, of Crime_Group and Date (that is, how many of each crime group).
SELECT 
    "Dispatch_Date",
    "Crime_Group", 
    COUNT("Crime_Group") AS "Frequency"
FROM 
    "IncidentsTimePlace"
GROUP BY 
    "Dispatch_Date", "Crime_Group"
ORDER BY 
    "Dispatch_Date", COUNT("Crime_Group") DESC;


--5. List the frequency of each type of crime within each District_PSA, group by both District_PSA and General_Crime_Category. 

SELECT "District_PSA", "General_Crime_Category", COUNT(*) AS "Frequency"
FROM "IncidentsTimePlace"
GROUP BY "District_PSA", "General_Crime_Category"
ORDER BY "District_PSA", COUNT(*) DESC;

--6. List the totals each type of crime within each District_PSA,

SELECT "District_PSA", COUNT(*) AS "Total_Crimes"
FROM "IncidentsTimePlace"
GROUP BY "District_PSA"
ORDER BY COUNT(*) DESC;

--7. List the totals each type of crime within each District_PSA,

SELECT "District_PSA", COUNT(*) AS "Total_Crimes"
FROM "IncidentsTimePlace"
GROUP BY "District_PSA"
ORDER BY COUNT(*) DESC;

---8. List the District_PSA, Crime Group and Frequncy.
SELECT "District_PSA", "Crime_Group", COUNT(*) AS "Frequency"
FROM "IncidentsTimePlace"
GROUP BY "District_PSA", "Crime_Group"
ORDER BY "District_PSA", COUNT(*) DESC;

-----------High School Metrics Analysis------------ 

---9. List Highschool Metrics with PSA and Crime Data
SELECT 
    ng."school_id",
    ng."SCHOOL_NAME",
    ng."District_PSA",
    hs."Percent_Students_Attending_at_Least_90_Percent",
    hs."Percent_11th_Grade_Students_Proficient_All_Three_Keystones"
FROM 
    "new_geo_schools_df" ng
JOIN 
    "high_school_metric_scores" hs
ON 
    ng."school_id" = hs."school_id"
ORDER BY 
    ng."District_PSA";

--10. Calculate the Average School Metrics for High Schools within the same PSA
SELECT 
    ng."District_PSA",
    AVG(hs."Percent_Students_Attending_at_Least_90_Percent") AS "Average_Percent_Attending_90",
    AVG(hs."Percent_11th_Grade_Students_Proficient_All_Three_Keystones") AS "Average_Percent_Proficient_All_Keystones"
FROM 
    "new_geo_schools_df" ng
JOIN 
    "high_school_metric_scores" hs
ON 
    ng."school_id" = hs."school_id"
GROUP BY 
    ng."District_PSA"
ORDER BY 
    ng."District_PSA";

--11. Now include the total crimes for each crime group per PSA
SELECT 
    itp."District_PSA",
    itp."Crime_Group",
    COUNT(*) AS "Total_Crimes"
FROM 
    "IncidentsTimePlace" itp
GROUP BY 
    itp."District_PSA", itp."Crime_Group"
ORDER BY 
    itp."District_PSA", COUNT(*) DESC;

--12. Combined query from #7 and #8 queries

SELECT 
    a."District_PSA",
    a."Average_Percent_Attending_90",
    a."Average_Percent_Proficient_All_Keystones",
    b."Crime_Group",
    b."Total_Crimes"
FROM 
    (
        SELECT 
            ng."District_PSA",
            AVG(hs."Percent_Students_Attending_at_Least_90_Percent") AS "Average_Percent_Attending_90",
            AVG(hs."Percent_11th_Grade_Students_Proficient_All_Three_Keystones") AS "Average_Percent_Proficient_All_Keystones"
        FROM 
            "new_geo_schools_df" ng
        JOIN 
            "high_school_metric_scores" hs ON ng."school_id" = hs."school_id"
       
        GROUP BY 
            ng."District_PSA"
    ) a
JOIN 
    (
        SELECT 
            itp."District_PSA",
            itp."Crime_Group",
            COUNT(*) AS "Total_Crimes"
        FROM 
            "IncidentsTimePlace" itp
        GROUP BY 
            itp."District_PSA", itp."Crime_Group"
    ) b ON a."District_PSA" = b."District_PSA"
ORDER BY 
    a."District_PSA", b."Total_Crimes" DESC;

--13. Total Crimes and Average of High School Metrics

SELECT 
    a."District_PSA",
    a."Average_Percent_Attending_90",
    a."Average_Percent_Proficient_All_Keystones",
    b."Total_Crimes"
FROM 
    (
        SELECT 
            ng."District_PSA",
            AVG(hs."Percent_Students_Attending_at_Least_90_Percent") AS "Average_Percent_Attending_90",
            AVG(hs."Percent_11th_Grade_Students_Proficient_All_Three_Keystones") AS "Average_Percent_Proficient_All_Keystones"
        FROM 
            "new_geo_schools_df" ng
        JOIN 
            "high_school_metric_scores" hs ON ng."school_id" = hs."school_id"
       
        GROUP BY 
            ng."District_PSA"
    ) a
JOIN 
    (
        SELECT 
            itp."District_PSA",
            COUNT(*) AS "Total_Crimes"
        FROM 
            "IncidentsTimePlace" itp
        GROUP BY 
            itp."District_PSA"
    ) b ON a."District_PSA" = b."District_PSA"
ORDER BY 
    a."District_PSA", b."Total_Crimes" DESC;

---------k-8 School metrics compared to crime in same PSA---------------
--14. Total Crimes and Average of k-8 School metrics 

SELECT 
    ng."District_PSA",
    AVG(ks."PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grades_3_to_8") AS "Average_ELA_Proficiency",
    AVG(ks."PSSA_Math_Percent_Students_Proficient_or_Advanced_Grades_3_to_8") AS "Average_Math_Proficiency",
	AVG(ks."Percent_Students_Attending_at_Least_90_Percent") AS "Average_Percent_Attending_90",
    b."Total_Crimes"
FROM 
    "new_geo_schools_df" ng
JOIN 
    "ktoeight_school_metric_scores" ks ON ng."school_id" = ks."school_id"
JOIN 
    (
        SELECT 
            itp."District_PSA",
            COUNT(*) AS "Total_Crimes"
        FROM 
            "IncidentsTimePlace" itp
        GROUP BY 
            itp."District_PSA"
    ) b ON ng."District_PSA" = b."District_PSA"

GROUP BY 
    ng."District_PSA", b."Total_Crimes"
ORDER BY 
    ng."District_PSA";

-----elementary metrics and crime data for same PSA--------------

---15. Total Crimes and Average of elementary School metrics 

SELECT 
    ng."District_PSA",
    AVG(es."PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grades_3_to_8") AS "Average_ELA_Proficiency_3_to_8",
    AVG(es."PSSA_Math_Percent_Students_Proficient_or_Advanced_Grades_3_to_8") AS "Average_Math_Proficiency_3_to_8",
    AVG(es."Percent_Students_Attending_at_Least_90_Percent") AS "Average_Percent_Attending_90",
	b."Total_Crimes"
FROM 
    "new_geo_schools_df" ng
JOIN 
    "elementary_school_metric_scores" es ON ng."school_id" = es."school_id"
JOIN 
    (
        SELECT 
            itp."District_PSA",
            COUNT(*) AS "Total_Crimes"
        FROM 
            "IncidentsTimePlace" itp
        GROUP BY 
            itp."District_PSA"
    ) b ON ng."District_PSA" = b."District_PSA"

GROUP BY 
    ng."District_PSA", b."Total_Crimes"
ORDER BY 
    ng."District_PSA";