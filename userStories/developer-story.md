# Value proposition

As a developer,  
I want to connect the application to a MongoDB database using Mongoose,  
so that I can access and retrieve data from two defined collections through API endpoints for frontend use.

## Description

The app **“money-manager”** should have two MongoDB collections: one to store the **transactions** and the other to store the **categories**.

## Acceptance criteria

- MongoDB should have one database named **`money-manager`** with two collections:
  - `transactions`
  - `categories`
- **transactions** collection should have the following fields:
  - `name`: name of transaction
  - `amount`: amount of transaction
  - `category`: category of transaction
  - `type`: expense or income
  - `date`: date of the transaction
- **categories** collection should have the following field:
  - `name`: name of categories

- Create a **GET** API endpoint for each collection.

## Tasks

- [ ] Create a new branch **`feature/database-setup`**.
- [ ] Create a database in MongoDB Atlas for the project and call it **`money-manager`**.
- [ ] Create **transactions\* and **categories\*\* collections.
- [ ] Connect the `money-manager` database to your app using your existing `connect.js`, and provide `MONGODB_URI` in `.env.local`.
- [ ] Define the Mongoose schema for transactions in **`db/models/Transaction.js`** with the fields mentioned above.
- [ ] Define the Mongoose schema for categories in **`db/models/Category>.js`** with the field mentioned above.
- [ ] Create API endpoints **`/api/transactions`** and **`/api/categories`** (GET).
- [ ] Connect to **`/api/transactions`** and **`/api/categories`** from the app to read data from the database.
