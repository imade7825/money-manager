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
  - `title`: title of the art piece
  - `imageUrl`: link to the art piece image
  - `artist`: name of the artist
  - `description`: a detailed description of the art piece
  - `year`: year the piece was created
  - `technics`: a list of `technic_id` from the **Technics** collection
- **Technics** collection should have the following field:
  - `name`: name of the technic (e.g., oil, acrylic, drapens)
- Create a **GET** API endpoint for each collection.

## Tasks

- [ ] Create a new branch **`feature/database-setup`**.
- [ ] Create a database in MongoDB Atlas for the project and call it **`art-gallery`**.
- [ ] Create **ArtPieces** and **Technics** collections.
- [ ] Connect the `art-gallery` database to your app using your existing `connect.js`, and provide `MONGODB_URI` in `.env.local`.
- [ ] Define the Mongoose schema for art pieces in **`db/models/ArtPiece.js`** with the fields mentioned above.
- [ ] Define the Mongoose schema for technics in **`db/models/Technic.js`** with the field mentioned above.
- [ ] Create API endpoints **`/api/artpieces`** and **`/api/technics`** (GET).
- [ ] Connect to **`/api/artpieces`** and **`/api/technics`** from the app to read data from the database.
