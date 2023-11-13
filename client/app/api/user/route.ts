export async function GET(request: Request) {
  const endPoint = request.headers.get("endPoint");
  try {
  } catch (error) {
    return Response.json(error);
  }
  return Response.json("Hello");
}

export async function POST(request: Request) {
  const endPoint = request.headers.get("endPoint");

  try {
    if (endPoint === "Register") {
      const body = await request.json();
      const res = await fetch("https://localhost:8002/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          rejectUnauthorized: "false",
        },
      });
      if (res.status != 201) {
        return Response.json(
          {
            message: "Error creating user",
          },
          {
            status: 401,
          }
        );
      }

      const user = await JSON.parse(await res.text());
      return Response.json(user);
    } else if (endPoint === "SignIn") {
      const body = await request.json();
      const res = await fetch("https://localhost:8002/", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          rejectUnauthorized: "false",
        },
      });
      if (res.status === 404) {
        return Response.json(
          {
            message: "Wrong Email or Password",
          },
          {
            status: 404,
          }
        );
      }
      const user = await JSON.parse(await res.text());
      return Response.json(user);
    }
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}
