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
      if (res.status == 200) {
        const car = await JSON.parse(await res.text());
        return Response.json(car);
      }
      return Response.json({ message: "Not Found" }, { status: res.status });
    } else if (endPoint === "make") {
      const res = await fetch(`https://localhost:8003/makes/all`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const makes = await res.json();
      return Response.json(makes);
    } else if (endPoint === "ID") {
      const id = request.headers.get("id");

      const res = await fetch(`https://localhost:8003/${id}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
        cache: "no-store",
      });

      if (res.status !== 200) {
        return Response.json({ message: "Not Found" }, { status: res.status });
      }
      const car = (await res.json()) as Car;

      await fetch("https://localhost:8005/", {
        method: "POST",
        body: JSON.stringify({ time: new Date(), carID: id, eventType: "View" }),
        headers: {
          "Content-Type": "application/json",
          rejectUnauthorized: "false",
        },
        cache: "no-store",
      });

      return Response.json(car);
    } else if (endPoint === "Reviews") {
      const id = request.headers.get("id");
      const res = await fetch(`https://localhost:8003/review/${id}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
        cache: "no-store",
      });
      const reviews = await res.json();
      // get user names and imgs:

      for (let i = 0; i < reviews.length; i++) {
        const res = await fetch(`https://localhost:8002/${reviews[i].userID}`);
        if (res.status == 200) {
          const user = await res.json();

          reviews[i] = { ...reviews[i], firstName: user.firstName };
        }
      }

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
  try {
    const endPoint = request.headers.get("endPoint");

    if (endPoint === "PostReview") {
      const id = request.headers.get("id");
      const body = await request.json();
      const res = await fetch(`https://localhost:8003/review/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          rejectUnauthorized: "false",
        },
      });
      if (res.status == 201) {
        return Response.json(await res.json());
      }
      return Response.json({ status: res.status });
    }
    return Response.json({});
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
