export async function GET(request: Request) {
  const endPoint = request.headers.get("endPoint");
  try {
    if (endPoint === "filter") {
      const res = await fetch(`https://localhost:8003/${request.headers.get("query")}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const car = await JSON.parse(await res.text());

      return Response.json(car);
    } else if (endPoint === "make") {
      const res = await fetch(`https://localhost:8003/makes/all`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const makes = await JSON.parse(await res.text());
      return Response.json(makes);
    } else if (endPoint === "ID") {
      const id = request.headers.get("id");
      const res = await fetch(`https://localhost:8003/${id}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      if (res.status === 404) {
        return Response.json(
          {
            message: "Not Found",
          },
          {
            status: 404,
          }
        );
      }
      const car = (await res.json()) as Car;
      return Response.json(car);
    } else if (endPoint === "Reviews") {
      const id = request.headers.get("id");
      const res = await fetch(`https://localhost:8003/review/${id}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const reviews = (await JSON.parse(await res.text())) as Review[];
      return Response.json(reviews);
    } else if (endPoint === "deals") {
      const cars = (await (
        await fetch("https://localhost:8003/deals/all", { headers: { rejectUnauthorized: "false" } })
      ).json()) as Car[];
      return Response.json(cars);
    }
  } catch (error) {
    return Response.json(error);
  }
  return Response.json("Hello");
}

export async function POST(request: Request) {
  const endPoint = request.headers.get("endPoint");

  try {
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}
