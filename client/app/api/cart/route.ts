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
      if (res.status != 200) {
        return Response.json({
          status: 404,
        });
      }
      const cart = await res.json();
      return Response.json(cart);
    }
  } catch (error) {
    return Response.json(error);
  }
  return Response.json("Hello");
}

export async function POST(request: Request) {
  const endPoint = request.headers.get("endPoint");
  try {
    if (endPoint === "addToCart") {
      const cartID = request.headers.get("cartID");
      const carID = request.headers.get("carID");

      const res = await fetch(`https://localhost:8004/${cartID}/${carID}`, {
        method: "POST",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      if (res.status == 201) {
        await fetch("https://localhost:8005/", {
          method: "POST",
          body: JSON.stringify({ time: new Date(), carID: carID, eventType: "Cart" }),
          headers: {
            rejectUnauthorized: "false",
          },
          cache: "no-store",
        });
        return Response.json({ message: "Added" }, { status: res.status });
      }

      return Response.json({ message: "not added" }, { status: res.status });
    }
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
      if (res.status !== 202) {
        return Response.json({ message: "failed" }, { status: res.status });
      }
      const response = await res.json();
      return Response.json(response);
    }
  } catch (error) {
    return Response.json(error);
  }
}
