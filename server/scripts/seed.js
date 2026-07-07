import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";

dotenv.config();

const menuItems = [
  {
    name: "Mapo Tofu",
    description: "Soft tofu cooked in a spicy Sichuan bean sauce.",
    price: 12.99,
    image: "/images/mapo-tofu-new.png",
    category: "Main"
  },
  {
    name: "Kung Pao Chicken",
    description: "Chicken stir-fried with peanuts, peppers, and house sauce.",
    price: 14.99,
    image: "/images/kung-pao-chicken.png",
    category: "Main"
  },
  {
    name: "Beef Noodle Soup",
    description: "Slow-cooked beef with noodles in a rich savory broth.",
    price: 13.99,
    image: "/images/beef-noodle-soup.png",
    category: "Noodles"
  },
  {
    name: "Dumplings",
    description: "Pan-fried dumplings served with a garlic soy dipping sauce.",
    price: 9.99,
    image: "/images/dumplings.png",
    category: "Appetizer"
  },
  {
    name: "Spicy Fish Fillet",
    description: "Tender fish fillets cooked in chili oil with bold Sichuan flavor.",
    price: 16.99,
    image: "/images/spicy-fish.png",
    category: "Main"
  },
  {
    name: "Fried Rice",
    description: "Classic fried rice with egg, scallions, peas, and mixed vegetables.",
    price: 10.99,
    image: "/images/fried-rice.png",
    category: "Rice"
  }
];

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in server/.env");
  }
  await mongoose.connect(process.env.MONGO_URI);
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuItems);
  console.log("Seeded menu items successfully");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
