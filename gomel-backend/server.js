import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// 🔥 MIDDLEWARES
app.use(express.json());
app.use(cors());

// 🔥 ENV CHECK
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");

    const db = client.db("gomelDB");
    const carsCollection = db.collection("cars");

    // 🌐 HOME
    app.get("/", (req, res) => {
      res.send("🚀 Server running");
    });

    // 🧪 TEST
    app.get("/test", (req, res) => {
      res.json({ success: true });
    });

    // ➕ ADD CAR
    app.post("/add-car", async (req, res) => {
      try {
        const { name, price, type, location } = req.body;

        if (!name || !price) {
          return res.status(400).json({
            success: false,
            error: "Name and price required",
          });
        }

        const newCar = {
          name,
          price,
          type: type || "Unknown",
          location: location || "Unknown",
          bookedDates: [], // 🔥 important
          createdAt: new Date(),
        };

        const result = await carsCollection.insertOne(newCar);

        res.status(201).json({
          success: true,
          data: result.insertedId,
        });

      } catch (err) {
        res.status(500).json({ error: "Failed to add car" });
      }
    });

    // 📥 GET ALL
    app.get("/cars", async (req, res) => {
      try {
        const cars = await carsCollection.find().toArray();

        res.json({
          success: true,
          data: cars,
        });

      } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
      }
    });

    // 📥 GET ONE
    app.get("/car/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid ID" });
        }

        const car = await carsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!car) {
          return res.status(404).json({ error: "Not found" });
        }

        res.json({ success: true, data: car });

      } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
      }
    });

    // 🔥 BOOK CAR (MAIN FEATURE)
    app.post("/book-car/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { pickupDate, returnDate } = req.body;

        if (!pickupDate || !returnDate) {
          return res.status(400).json({ error: "Dates required" });
        }

        const start = new Date(pickupDate);
        const end = new Date(returnDate);

        if (end <= start) {
          return res.status(400).json({ error: "Invalid dates" });
        }

        const car = await carsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!car) {
          return res.status(404).json({ error: "Car not found" });
        }

        const bookedDates = car.bookedDates || [];

        // 🔥 CHECK CONFLICT
        const conflict = bookedDates.some((date) => {
          const d = new Date(date);
          return d >= start && d <= end;
        });

        if (conflict) {
          return res.status(400).json({
            error: "Car already booked for selected dates",
          });
        }

        // 🔥 CREATE DATE RANGE
        const newDates = [];
        let current = new Date(start);

        while (current <= end) {
          newDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }

        // 🔥 UPDATE DB
        await carsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $push: {
              bookedDates: { $each: newDates },
            },
          }
        );

        res.json({
          success: true,
          message: "Booking successful 🚀",
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Booking failed" });
      }
    });

    // ❌ DELETE
    app.delete("/car/:id", async (req, res) => {
      try {
        const result = await carsCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });

        res.json({ success: true });

      } catch {
        res.status(500).json({ error: "Delete failed" });
      }
    });

    // ✏️ UPDATE
    app.put("/car/:id", async (req, res) => {
      try {
        await carsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );

        res.json({ success: true });

      } catch {
        res.status(500).json({ error: "Update failed" });
      }
    });

    // 🚀 START
    app.listen(PORT, () => {
      console.log(`🚀 Running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();