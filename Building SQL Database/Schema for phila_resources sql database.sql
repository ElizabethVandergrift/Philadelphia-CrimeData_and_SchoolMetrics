-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/xDohN2
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Incidents" (
    "UCR_Code" int   NOT NULL,
    "General_Crime_Category" varchar   NOT NULL,
    "Crime_Group" varchar   NOT NULL,
    CONSTRAINT "pk_Incidents" PRIMARY KEY (
        "UCR_Code"
     )
);

CREATE TABLE "IncidentsTimePlace" (
    "Incident_ID" int   NOT NULL,
    "District" int   NOT NULL,
    "Police_Service_Area" varchar   NOT NULL,
    "District_PSA" varchar   NOT NULL,
    "Dispatch_Date_And_Time" timestamp   NOT NULL,
    "Dispatch_Date" date   NOT NULL,
    "Dispatch_Time" varchar   NOT NULL,
    "Dispatch_Hour" float   NOT NULL,
    "Location_Block" varchar   NOT NULL,
    "UCR_Code" int   NOT NULL,
    "General_Crime_Category" varchar   NOT NULL,
    "Crime_Group" varchar   NOT NULL,
    CONSTRAINT "pk_IncidentsTimePlace" PRIMARY KEY (
        "Incident_ID"
     )
);

CREATE TABLE "PoliceLocation" (
    "Police_Location_ID" float   NOT NULL,
    "District" int   NOT NULL,
    "Location" varchar   NOT NULL,
    "Zip_Code" varchar   NOT NULL,
    "TelephoneNumber" varchar   NOT NULL,
    "Geometry" varchar   NOT NULL,
    CONSTRAINT "pk_PoliceLocation" PRIMARY KEY (
        "Police_Location_ID"
     )
);

CREATE TABLE "Districts" (
    "District_PSA" varchar   NOT NULL,
    "District" int   NOT NULL,
    "Unique_Police_Service_Areas" varchar   NOT NULL,
    "Police_Location_ID" float   NOT NULL,
    "Location" varchar   NOT NULL,
    "Zip_Code" varchar   NOT NULL,
    "TelephoneNumber" varchar   NOT NULL,
    "Geometry" varchar   NOT NULL,
    CONSTRAINT "pk_Districts" PRIMARY KEY (
        "District_PSA"
     )
);

CREATE TABLE "new_geo_schools_df" (
    "OBJECTID" int   NOT NULL,
    "school_id" int   NOT NULL,
    "SCHOOL_NAME" varchar   NOT NULL,
    "SCHOOL_NAME_LABEL" varchar   NOT NULL,
    "STREET_ADDRESS" varchar   NOT NULL,
    "ZIP_CODE" varchar   NOT NULL,
    "PHONE_NUMBER" varchar   NOT NULL,
    "GRADE_LEVEL" varchar   NOT NULL,
    "GRADE_ORG" varchar   NOT NULL,
    "TYPE" int   NOT NULL,
    "TYPE_SEPCIFIC" varchar   NOT NULL,
    "geometry" varchar   NOT NULL,
    "District" int   NOT NULL,
    "District_PSA" varchar   NOT NULL,
    CONSTRAINT "pk_new_geo_schools_df" PRIMARY KEY (
        "OBJECTID"
     )
);

CREATE TABLE "School_List" (
    "school_id" int   NOT NULL,
    "SCHOOL_NAME" varchar   NOT NULL,
    "SCHOOL_NAME_LABEL" varchar   NOT NULL,
    "TYPE" int   NOT NULL,
    "TYPE_SPECIFIC" varchar   NOT NULL,
    CONSTRAINT "pk_School_List" PRIMARY KEY (
        "school_id"
     )
);

CREATE TABLE "elementary_school_metric_scores" (
    "Year" varchar   NOT NULL,
    "school_id" int   NOT NULL,
    "School_Name" varchar   NOT NULL,
    "Report_Type" varchar   NOT NULL,
    "Admission_Type" varchar   NOT NULL,
    "Number_Students_Served_Full_Year" int   NOT NULL,
    "October_1_Enrollment" int   NOT NULL,
    "PSSA_ELA_Percent_Students_Below_Basic_Grade_3" float   NOT NULL,
    "PSSA_ELA_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grade_3" float   NOT NULL,
    "PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Below_Basic_Grade_3" float   NOT NULL,
    "PSSA_Math_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Proficient_or_Advanced_Grade_3" float   NOT NULL,
    "PSSA_Math_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Below_Basic_Grades_4_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Proficient_or_Advanced_Grades_4_to_8" float   NOT NULL,
    "Percent_Metrics_Improving_All_Students" float   NOT NULL,
    "Percent_Students_Attending_at_Least_90_Percent" float   NOT NULL,
    "Percent_Students_Receiving_Zero_Out_of_School_Suspensions" float   NOT NULL
);

CREATE TABLE "high_school_metric_scores" (
    "Year" varchar   NOT NULL,
    "school_id" int   NOT NULL,
    "School_Name" varchar   NOT NULL,
    "Report_Type" varchar   NOT NULL,
    "Admission_Type" varchar   NOT NULL,
    "Number_Students_Served_Full_Year" int   NOT NULL,
    "October_1_Enrollment" int   NOT NULL,
    "Percent_11th_Grade_Students_Proficient_All_Three_Keystones" float   NOT NULL,
    "Percent_11th_Grade_Students_Below_Basic_Keystone_Algebra_I" float   NOT NULL,
    "Percent_11th_Grade_Students_Proficient_Keystone_Algebra_I" float   NOT NULL,
    "Percent_11th_Grade_Students_Below_Basic_Keystone_Biology" float   NOT NULL,
    "Percent_11th_Grade_Students_Proficient_Keystone_Biology" float   NOT NULL,
    "Percent_11th_Grade_Students_Below_Basic_Keystone_Literature" float   NOT NULL,
    "Percent_11th_Grade_Students_Proficient_Keystone_Literature" float   NOT NULL,
    "Percent_12th_Grade_CTE_Students_Meeting_Industry_Standards" float   NOT NULL,
    "Ninth_Grade_On_Track_Rate" float   NOT NULL,
    "Percent_Metrics_Improving_All_Students" float   NOT NULL,
    "Percent_Students_Attending_at_Least_90_Percent" float   NOT NULL,
    "Number_Dropouts_Grades_7_to_12" int   NOT NULL,
    "Percent_Students_Receiving_Zero_Out_of_School_Suspensions" float   NOT NULL,
    "Percent_Students_Completing_the_FAFSA_by_End_of_12th_Grade" float   NOT NULL,
    "First_Fall_Matriculation" float   NOT NULL,
    "Four_Year_Cohort_Graduation_Rate" float   NOT NULL
);

CREATE TABLE "middle_school_metric_scores" (
    "Year" varchar   NOT NULL,
    "school_id" int   NOT NULL,
    "School_Name" varchar   NOT NULL,
    "Report_Type" varchar   NOT NULL,
    "Admission_Type" varchar   NOT NULL,
    "Number_Students_Served_Full_Year" int   NOT NULL,
    "October_1_Enrollment" int   NOT NULL,
    "PSSA_ELA_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Below_Basic_Grades_4_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Proficient_or_Advanced_Grades_4_to_8" float   NOT NULL,
    "Percent_Metrics_Improving_All_Students" float   NOT NULL,
    "Percent_Students_Attending_at_Least_90_Percent" float   NOT NULL,
    "Number_Dropouts_Grades_7_to_12" float   NOT NULL,
    "Percent_Students_Receiving_Zero_Out_of_School_Suspensions" float   NOT NULL
);

CREATE TABLE "ktoeight_school_metric_scores" (
    "Year" varchar   NOT NULL,
    "school_id" int   NOT NULL,
    "School_Name" varchar   NOT NULL,
    "Report_Type" varchar   NOT NULL,
    "Admission_Type" varchar   NOT NULL,
    "Number_Students_Served_Full_Year" int   NOT NULL,
    "October_1_Enrollment" int   NOT NULL,
    "PSSA_ELA_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_ELA_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Below_Basic_Grades_3_to_8" float   NOT NULL,
    "PSSA_Math_Percent_Students_Proficient_or_Advanced_Grades_3_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Below_Basic_Grades_4_to_8" float   NOT NULL,
    "PSSA_Science_Percent_Students_Proficient_or_Advanced_Grades_4_to_8" float   NOT NULL,
    "Percent_Metrics_Improving_All_Students" float   NOT NULL,
    "Percent_Students_Attending_at_Least_90_Percent" float   NOT NULL,
    "Percent_Students_Receiving_Zero_Out_of_School_Suspensions" float   NOT NULL,
    "Number_Dropouts_Grades_7_to_12" float   NOT NULL
);

ALTER TABLE "IncidentsTimePlace" ADD CONSTRAINT "fk_IncidentsTimePlace_District_PSA" FOREIGN KEY("District_PSA")
REFERENCES "Districts" ("District_PSA");

ALTER TABLE "IncidentsTimePlace" ADD CONSTRAINT "fk_IncidentsTimePlace_UCR_Code" FOREIGN KEY("UCR_Code")
REFERENCES "Incidents" ("UCR_Code");

ALTER TABLE "Districts" ADD CONSTRAINT "fk_Districts_Police_Location_ID" FOREIGN KEY("Police_Location_ID")
REFERENCES "PoliceLocation" ("Police_Location_ID");

ALTER TABLE "new_geo_schools_df" ADD CONSTRAINT "fk_new_geo_schools_df_school_id" FOREIGN KEY("school_id")
REFERENCES "School_List" ("school_id");

ALTER TABLE "new_geo_schools_df" ADD CONSTRAINT "fk_new_geo_schools_df_District_PSA" FOREIGN KEY("District_PSA")
REFERENCES "Districts" ("District_PSA");

ALTER TABLE "elementary_school_metric_scores" ADD CONSTRAINT "fk_elementary_school_metric_scores_school_id" FOREIGN KEY("school_id")
REFERENCES "School_List" ("school_id");

ALTER TABLE "high_school_metric_scores" ADD CONSTRAINT "fk_high_school_metric_scores_school_id" FOREIGN KEY("school_id")
REFERENCES "School_List" ("school_id");

ALTER TABLE "middle_school_metric_scores" ADD CONSTRAINT "fk_middle_school_metric_scores_school_id" FOREIGN KEY("school_id")
REFERENCES "School_List" ("school_id");

ALTER TABLE "ktoeight_school_metric_scores" ADD CONSTRAINT "fk_ktoeight_school_metric_scores_school_id" FOREIGN KEY("school_id")
REFERENCES "School_List" ("school_id");
