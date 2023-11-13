export async function GET(request: Request) {
  const endPoint = request.headers.get("endPoint");
  try {
    if (endPoint === "getCart") {
      const id = request.headers.get("id");
      const res = await fetch(`https://localhost:8004/${id}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const cart = await res.json();
      const cars: any[] = [];
      for (let i = 0; i < cart.length; i++) {
        const res = await fetch(`https://localhost:8003/${cart[i].carID}`, {
          method: "GET",
          headers: {
            rejectUnauthorized: "false",
          },
        });
        const car = await res.json();
        car.quantity = cart[i].quantity;
        cars.push(car);
      }

      return Response.json(cars);
    }
  } catch (error) {
    return Response.json(error);
  }
  return Response.json("Hello");
}

export async function POST(request: Request) {
  const endPoint = request.headers.get("endPoint");
  if (endPoint === "addToCart") {
    const cartID = request.headers.get("cartID");
    const carID = request.headers.get("carID");

    const res = await fetch(`https://localhost:8004/${cartID}/${carID}`, {
      method: "POST",
      headers: {
        rejectUnauthorized: "false",
      },
    });
    if (res.status === 201) {
      return Response.json(
        {
          message: "added",
        },
        {
          status: 201,
        }
      );
    }

    return Response.json(
      {
        message: "Not added",
      },
      {
        status: 500,
      }
    );
  }
  try {
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

export async function DELETE(request: Request) {
  const endPoint = request.headers.get("endPoint");
  try {
    if (endPoint === "deleteFromCart") {
      const cartID = request.headers.get("cartID");
      const carID = request.headers.get("carID");

      const res = await fetch(`https://localhost:8004/${cartID}/${carID}`, {
        method: "DELETE",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      if (res.status === 204) {
        return Response.json(
          {
            message: "failed",
          },
          {
            status: 204,
          }
        );
      }
      const response = await res.json();
      return Response.json(response);
    }
  } catch (error) {
    return Response.json(error);
  }
  return Response.json("Hello");
}
