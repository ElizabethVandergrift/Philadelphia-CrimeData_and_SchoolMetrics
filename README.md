# Philadelphia Crime Incidents and School Metrics Correlation Analysis

## Project Overview
This project explores potential correlations between crime incidents in Philadelphia during the year 2024 and school performance metrics from the previous year, 2023. It aims to understand how crime rates might influence educational outcomes across different Police Service Areas (PSAs) in the city.

https://elizabethvandergrift.github.io/Project-3/

## Table of Contents
- **[Outputs_Police](./Outputs_Police)**: Contains outputs related to police data analysis.
- **[Outputs_School_Metrics](./Outputs_School_Metrics)**: Contains outputs from school metrics analysis.
- **[data](./data)**: Data files used in the project, including cleaned and raw datasets.
- **[static](./static)**: General static files for the web interface.
- **[Diagram-Schools_Metrics_Police_Incidents.png](./Diagram-Schools_Metrics_Police_Incidents.png)**: Diagram illustrating the data flow and relationships.
- **[Police_and_Incidents_Clean_up and Correlation Analysis.ipynb](./Police_and_Incidents_Clean_up%20and%20Correlation%20Analysis.ipynb)**: Jupyter notebook for cleaning and analyzing police and incident data.
- **[Presentation_Philly_Crime_School.pptx](./Presentation_Philly_Crime_School.pptx)**: Main project presentation.
- **[SQL Outputs](./SQL%20Outputs)**: Contains SQL query outputs and results.
- **[Queries for phila_resources sql database.sql](./Queries%20for%20phila_resources%20sql%20database.sql)**: SQL queries used in the project.
- **[Schema for phila_resources sql database.sql](./Schema%20for%20phila_resources%20sql%20database.sql)**: SQL schema for the project database.
- **[Scool_Metrics_Cleanup.ipynb](./Scool_Metrics_Cleanup.ipynb)**: Jupyter notebook for cleaning school metrics data.
- **[index.html](./index.html)**: Main entry point for the project's web interface.
- **[README.md](./README.md)**: Project documentation.
  
## Ethical Considerations
When analyzing data that involves crime statistics and educational performance, several ethical considerations must be taken into account:

- **Privacy and Anonymity**: While data sources are publicly available, care is taken to ensure that no personal information about individuals involved in crime reports or students in schools is used or disclosed. All analyses are performed at an aggregated level to maintain anonymity.

- **Bias and Fairness**: This analysis recognizes the potential for biases inherent in crime reporting and school performance evaluations. Efforts are made to present data and findings fairly, without perpetuating stereotypes or unfairly targeting specific communities.

- **Impact Awareness**: The findings from this analysis are intended to inform and support improvements in educational and community safety strategies. They should not be used to stigmatize communities or justify punitive measures that may adversely affect any demographic group.

- **Data Integrity and Transparency**: All sources of data are clearly documented, providing transparency about the origins and nature of the data used. Changes to data, such as cleaning or transformations, are also fully documented to ensure the analysis can be reproduced and verified by others.

## Data Sources
This analysis uses datasets from various public sources to provide a comprehensive view of the relationship between crime rates and school performance in Philadelphia:

### Crime Incidents (2024)
Detailed records of crime incidents within Philadelphia for the year 2024.
- [Crime Incidents Data](https://opendataphilly.org/datasets/crime-incidents/)
- This file contains over 85,000 entries.

### School Performance Metrics (2023)
Performance metrics for Philadelphia schools for the school year 2022-2023.
- [School Metric Scores](https://www.philasd.org/performance/programsservices/open-data/school-performance/#school_progress_report_education_and_equity)

### Geospatial Data
- [Police Stations](https://opendataphilly.org/datasets/police-stations/)
- [Schools](https://opendataphilly.org/datasets/schools/)
- [ZIP Codes](https://opendataphilly.org/datasets/zip-codes/)
- [Police Service Areas](https://opendataphilly.org/datasets/police-service-areas/)

## Methodology
- **Data Cleaning and Preprocessing**: Ensuring both datasets are clean and formatted correctly.
    - School_Metrics_Cleanup.ipynb
    - Police_and_Incidents_Clean_up and Correlation Analysis.ipynb
- **Data Merging**: Combining datasets on the basis of PSA.
    - Police_and_Incidents_Clean_up and Correlation Analysis.ipynb
    - Database Design:
        - Diagram-Schools_Metrics_Police_Incidents.png
        - Schema for phila_resources sql database.sql
        - Queries for phila_resources sql database.sql
- **Statistical Analysis**: Identifying correlations between crime rates and school performance metrics.
    - Police_and_Incidents_Clean_up and Correlation Analysis.ipynb
- **Visualization**: Creating interactive visualizations to depict relationships.  
    - Interactive Map of Crime and School Locations and PSA and ZIP Code Boundaries
    - Visualization located here: https://elizabethvandergrift.github.io/Project-3/
    - static
        - style.css
        - logic.js

## Technologies Used
- **Python**, **Plotly**, **D3.js**, **Pandas**, and **SQL Database**.

## Contributing
There were three contributors for this project: 
Juan Camilo Bohorquez Rozo, 
Eric Croston, 
Elizabeth Vandergrift

## Acknowledgments for Data Sources
- Philadelphia Police Department
- Philadelphia School District
- OpenDataPhilly
