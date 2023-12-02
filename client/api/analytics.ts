const URL = process.env.NEXT_URL || "http://localhost:3000";

export const recordView = async (carID: number) => {
  fetch(`${URL}/aws/analytics/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      time: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      carID: carID,
      eventType: "View",
    }),
  });
};

export const recordCart = async (carID: number) => {
  fetch(`/aws/analytics/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      time: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      carID: carID,
      eventType: "Cart",
    }),
  });
};

export const recordOrder = async (carID: number) => {
  fetch(`/aws/analytics/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      time: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      carID: carID,
      eventType: "Order",
    }),
  });
};

export const usuageReport = async (user: User) => {
  const res = await fetch(`/aws/analytics/`, {
    method: "PUT",
    body: JSON.stringify({ token: user.token }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 200) return await res.json();
};

export const salesReport = async (user: User, carID: number) => {
  const res = await fetch(`/aws/analytics/${carID}`, {
    method: "PUT",
    body: JSON.stringify({ token: user.token }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 200) return await res.json();
};
