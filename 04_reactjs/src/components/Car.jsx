import React from "react";

const Car = ({ make, model, year, price }) => {
  console.log({ make, model, year, price });
  return (
    <div>
      <p>
        {year} {make} {model}
      </p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Car;
