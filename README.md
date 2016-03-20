# SocialTrajectory
Messy Code for an application to visualize geosocial trajectories
needs a lot of refactoring removing unused stuff etc... 

# What it does
It preprocesses tweets ( language and sentiment detection ), stores that into a postgre DB. 
A web application uses the data and calculates trajectories for a given clustering strategy.

# Dependencies: 
Local Php Server, 
Postgres DB (used version 9.4.1) with Postgis extension

# Java Workspace: 
contains the Java code for preprocessing tweetdata and storing into a Postgres DB. 

# Trained Data: 
contains result of training data for language, topic and sentiment classification

# Webapplication
contains the web application that is build on top of cesium.js and uses d3.js for data manipulation and processing

# Tweetdata 
Tweetdata is in CSV model 
see example.csv for structure

# Used libraries:
http://stanfordnlp.github.io/CoreNLP/
https://sourceforge.net/projects/simmetrics/
http://www.csvreader.com/java_csv.php
http://alias-i.com/lingpipe/

