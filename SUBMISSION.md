# Idea for submission

1) Using PostgreSQL, build the relational database based on the CSV files
2) Deploy API with endpoint /fastestFlight that receives the origin and destination
3) When endpoint is called, fetch the directed graph representation from the database with calculated distances using POSTGIS
4) Load graph into a Graph data structure
5) Execute Shortest Path algorithm (Dijkstra) and find the shortest flight
6) Make additional queries to fill out values for Airport, and other details
7) Return to user as JSON if everything executed with success

## Structure

+-----------------------------------------------------------------+
| Docker-Compose                                                  |
|                                                                 |
| +----------------------+                 +-------------------+  |
| |                      |                 |                   |  |
| |POSTGRESQL            |                 |  Express API      |  |
| |with POSTGIS          +<----------------+  GET              |  |
| |to calculate distance |                 |  /fastestFlight   |  |
| |on query              +---------------->+  ?origin=X        +----------------------->
| |                      |                 |  &destination=Y   |  |  Expose API
| |                      |                 |                   |  |  on 3000
| |                      |                 |                   |  |
| |                      |                 |                   |  |
| +----------------------+                 +-------------------+  |
|                                                                 |
+-----------------------------------------------------------------+

Two containers:
- One for the database, which is using an image from DockerHub
- Another for the node app, currently:
    - Installs the packages
    - Copy everything to image
    - Run scripts to init db and run API

## How to Run

### Requirements
- docker
- docker-compose

The only requirements should be these two, the stack inside the container contains:
- PostgreSQL + POSTGIS
- API using NodeJS with Express 

### Run
```
docker-compose up --build
```

In sucession, the following should happen:
1) Creation of DB tables
2) Initialization of values in PostgreSQL
3) API should be exposed

## TODOs

- Add data structure based on Map to store Graph returned from getFlightDistances()
- Add function for shortest path algorithm into API
- Find a way to codify each airport into an unique integer so shortest_path algorithm from pgRouting could be used
- Add jest for unit tests
- Update Dockerfile images
