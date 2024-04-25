# Coding Task: Backend Development for a Food Delivery App

## Objective
The objective is to develop a REST API backend for a food delivery app using Node.js. The primary focus is on implementing a dynamic pricing module to calculate the total cost of food delivery based on various factors.

## Key Features
- **Dynamic Pricing Module with REST API:**
  - The API can calculate delivery costs for different types of food items across various zones based on the distance and item type.
  - The API can dynamically determine pricing based on:
    - Base Distance and Price: For example, a base distance of 5 km with a base price of 10 euros.
    - Per Km Price: For distances beyond the base, e.g., 1.5 EUR/km for perishable items and 1 EUR/km for non-perishable items.
  - The API response should include the total price for the delivery of the specified food items in the given zone for the particular organization.

## Setup Guide
  - Install Node JS in your machine
  - Install PostgreSQL in your local machine(install command line or GUI of postgres to run the below commands)
  - Run the following DB Queries:
 ```sql
    CREATE DATABASE "PriceCalculator"
```

```sql
    CREATE TABLE public."Organisation"
    (
        id serial NOT NULL,
        name character varying(50) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT name CHECK (LENGTH(name) <= 50) NOT VALID
    );
```

```sql
CREATE TABLE public."Item"
(
    id serial NOT NULL,
    type character varying(50) NOT NULL,
    description character varying(512) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT type CHECK (type IN ('perishable', 'non-perishable')) NOT VALID
);
```
```sql
CREATE TABLE public."Price"
(
    id serial NOT NULL PRIMARY KEY UNIQUE,
    organization_id integer NOT NULL,
    item_id integer NOT NULL,
    zone character varying(50) NOT NULL,
    base_distance_in_km real NOT NULL,
    km_price character varying(50) NOT NULL,
    fix_price real NOT NULL,
    CONSTRAINT "Unique_Price" UNIQUE (organization_id, zone),
    CONSTRAINT "FK_Org" FOREIGN KEY (organization_id)
        REFERENCES public."Organisation" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FK_Item" FOREIGN KEY (item_id)
        REFERENCES public."Item" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
```
 - Clone this project repository
 - Navigate into the project root directory in command line
 - run npm install
 - Now create a file named .env in the root of the project and add the following to it by filling your db details
 ```env
dbHost=<your-db-host>
dbUser=<your-db-user>
dbName=PriceCalculator
dbPassword=<your-db-password>
dbPort=<your-db-port>
corsAllowedOrigin=*
 ```
 - And That's it. You are good to go. Run `npm run dev` in the root of the project


## Database Relations
- **Organization:**
  - May have multiple pricing structures based on the zone and item type.
- **Item:**
  - Identified by type (perishable, non-perishable) and description.
- **Pricing:**
  - Linked to an organization and item, includes zone-specific base pricing and per km rates.

## Database Schema
Used PostgreSQL. Designed the schema with validations for API input payloads.

## Technical Specifications
- **API Request and Response Format:**
  - **Request:** { zone: "central", organization_id: "005", total_distance: 12, item_type: "perishable" }
  - **Response:** { total_price: 20.5 }
- **Database Models:**
  - **Organization:** { id, name }
  - **Item:** { id, type, description }
  - **Pricing:** { organization_id, item_id, zone, base_distance_in_km: 5, km_price: 1.5/1, fix_price: 10 }
- **Price Calculation:**
  - Implemented as a service object. Prices should be in cents to avoid decimal issues.
- **Coding Standards:**
  - Followed a recognized linting standard (e.g., Airbnb's style guide).

## Deliverables
- **Deploy Application:**
  - Deployeded the application on render.com with a proper swagger page.
  - you can find it here: [http://localhost:3000](http://localhost:3000)
  - Swagger docs here: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **API Documentation:**
  - Detailing endpoints, request/response formats, and error handling of the api was done using Swagger.

## Conclusion
Building a backend for a food delivery app requires careful consideration of various factors such as dynamic pricing, database design, API development, and testing. By following the outlined objectives and key features, you can create a robust and efficient backend system that meets the requirements of the application.
