const URL = process.env.NEXT_URL || "http://localhost:3000";
export const submitOrder = async (userID: number, token: string) => {
  try {
    const response = await fetch(`/aws/orders/${userID}`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    return await response.text();
  } catch {
    return "Internal Error";
  }
};

export const getOrders = async (userID: number, token: string): Promise<[]> => {
  try {
    const response = await fetch(`/aws/orders/${userID}`, {
      method: "PUT",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) return await response.json();
    return [];
  } catch {
    return [];
  }
};

export const guestOrder = async (cars: Car[]): Promise<string> => {
  try {
    const response = await fetch(`/aws/orders/order/guest`, {
      method: "POST",
      body: JSON.stringify({ cars: cars }),
      headers: { "Content-Type": "application/json" },
    });

    return await response.text();
  } catch {
    return "Internal Error";
  }
};
