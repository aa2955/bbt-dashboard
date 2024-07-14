use BBTDash;

CREATE TABLE Region (
    Region_ID TEXT,
    Timestamp TEXT,
    Region VARCHAR(255)
);

CREATE TABLE Country (
    Country_ID TEXT,
    Timestamp TEXT,
    Country VARCHAR(255),
    Region_ID FLOAT
);

CREATE TABLE Community (
    Community_ID VARCHAR(255),
    Timestamp TEXT,
    Community VARCHAR(255),
    Country_ID TEXT,
    Comment VARCHAR(255)
);

CREATE TABLE Campaign (
    Campaign_ID TEXT,
    Timestamp TEXT,
    Campaign_Name VARCHAR(255)
);

CREATE TABLE Participation (
    Participation_ID TEXT,
    Timestamp TEXT,
    Community_ID TEXT,
    Campaign_ID TEXT,
    Year VARCHAR(255),
    Pledge_Count FLOAT,
    Actual_Score_Count FLOAT
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE,
    PasswordHash VARCHAR(255),
    AccessLevel ENUM('admin', 'region_leader', 'temple_leader', 'public'),
    RegionID INT,  -- Only for region_leader and temple_leader
    CommunityID INT  -- Only for temple_leader
);


CREATE TABLE Metrics (
    MetricID INT AUTO_INCREMENT PRIMARY KEY,
    CommunityID VARCHAR(255),
    Year INT,
    LifetimeSets INT,
    SetsLastYear INT,
    ExpectedSets2024 INT,
    ExpectedSets2026 INT,
    GrowthRate2022_2023 FLOAT,
    AverageYearlyGrowthRate FLOAT,
    OverallGrowthRate FLOAT,
    FOREIGN KEY (CommunityID) REFERENCES Community(Community_ID)
);




