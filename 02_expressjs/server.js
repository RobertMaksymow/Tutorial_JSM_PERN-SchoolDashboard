import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

let cars = [
  { id: 1, name: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, name: "Honda", model: "Civic", year: 2019 },
  { id: 3, name: "Ford", model: "Mustang", year: 2021 },
];

app.get("/", (req, res) => {
  res.send(
    "This is the root route of the Express.js server. API about Cars is available at /api/v1/cars",
  );
});

router.get("/", (req, res) => {
  res.json(cars);
});

router.get("/:id", (req, res) => {
  //   res.send(`GET A CAR WITH ID ${req.params.id}`);
  const id = Number(req.params.id);
  const car = cars.find((car) => car.id === id);

  // if (car) {
  //   res.json(car);
  // } else {
  //   res.status(404).send("Car not found");
  // }})

  if (!car) return res.status(404).send("Car not found");
  res.json(car);
});

router.post("/", (req, res) => {
  const { name, model, year } = req.body;

  if (!name || !model || !year) {
    return res.status(400).send("Missing required fields: name, model, year");
  }

  const newCar = {
    id: cars.length + 1,
    name,
    model,
    year,
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) {
    return res.status(404).send("Car not found");
  }

  const { name, model, year } = req.body;

  if (name) cars[carIndex].name = name;
  if (model) cars[carIndex].model = model;
  if (year) cars[carIndex].year = year;

  res.json(cars[carIndex]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) {
    return res.status(404).send("Car not found");
  }

  const carDeleted = cars.splice(carIndex, 1)[0];
  res.json({ message: "Car deleted successfully", car: carDeleted });
});

app.use("/api/v1/cars", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
