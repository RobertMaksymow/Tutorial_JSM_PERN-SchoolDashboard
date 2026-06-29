import React, { useState, useEffect } from "react";
import Car from "./components/Car";

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/v1/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.log("Error fetching cars:", error));
  }, []);
  console.log("Fetched cars:", cars); // Log the fetched cars to the console

  return (
    <div>
      <h1>Welcome to the Car API</h1>
      <ul>
        {cars.map((car) => (
          // <Car key={car.id} car={car} />
          <Car key={car.id} {...car} />
        ))}
      </ul>
    </div>
  );
};

export default App;
