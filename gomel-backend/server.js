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

// ✅ Mongo Client (clean version)
const client = new MongoClient(process.env.MONGO_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");

    const db = client.db("gomelDB");
    const carsCollection = db.collection("cars");

    // 🌐 HOME
    app.get("/", (req, res) => {
      res.send("🚀 Server is running perfectly");
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
          bookedDates: [],
          createdAt: new Date(),
        };

        const result = await carsCollection.insertOne(newCar);

        return res.status(201).json({
          success: true,
          data: result.insertedId,
        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Failed to add car",
        });
      }
    });

    // 📥 GET ALL
    app.get("/cars", async (req, res) => {
      try {
        const cars = await carsCollection.find().toArray();

        return res.json({
          success: true,
          data: cars,
        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Fetch failed",
        });
      }
    });

    // 📥 GET ONE
    app.get("/car/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID",
          });
        }

        const car = await carsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!car) {
          return res.status(404).json({
            success: false,
            error: "Car not found",
          });
        }

        return res.json({
          success: true,
          data: car,
        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Fetch failed",
        });
      }
    });

    // 🔥 BOOK CAR
    app.post("/book-car/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { pickupDate, returnDate } = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID",
          });
        }

        if (!pickupDate || !returnDate) {
          return res.status(400).json({
            success: false,
            error: "Dates required",
          });
        }

        const start = new Date(pickupDate);
        const end = new Date(returnDate);

        if (end <= start) {
          return res.status(400).json({
            success: false,
            error: "Invalid date range",
          });
        }

        const car = await carsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!car) {
          return res.status(404).json({
            success: false,
            error: "Car not found",
          });
        }

        const bookedDates = car.bookedDates || [];

        // 🔥 conflict check
        const conflict = bookedDates.some((date) => {
          const d = new Date(date);
          return d >= start && d <= end;
        });

        if (conflict) {
          return res.status(400).json({
            success: false,
            error: "Car already booked for selected dates",
          });
        }

        // 🔥 generate dates
        const newDates = [];
        let current = new Date(start);

        while (current <= end) {
          newDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }

        await carsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $push: {
              bookedDates: { $each: newDates },
            },
          }
        );

        return res.json({
          success: true,
          message: "Booking successful 🚀",
        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Booking failed",
        });
      }
    });

    // ❌ DELETE
    app.delete("/car/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID",
          });
        }

        await carsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        return res.json({ success: true });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Delete failed",
        });
      }
    });

    // ✏️ UPDATE
    app.put("/car/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID",
          });
        }

        await carsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );

        return res.json({ success: true });

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: "Update failed",
        });
      }
    });

    // 🚀 START SERVER
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server failed:", err);
    process.exit(1);
  }
}

startServer();