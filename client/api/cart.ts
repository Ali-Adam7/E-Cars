export const addCar = async (cartID: number, carID: number, quantity: number, token: string): Promise<void> => {
  try {
    for (let i = 0; i < quantity; i++) {
      await fetch(`/aws/shoppingCart/${cartID}/${carID}`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getCart = async (cartID: number, token: string): Promise<Car[]> => {
  try {
    const cart = await fetch(`/aws/shoppingCart/${cartID}/`, {
      method: "PUT",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    if (cart.status == 200) return cart.json();
    return [];
  } catch (error) {
    return [];
  }
};
export const removeCar = async (cartID: number, carID: number, token: string): Promise<number> => {
  try {
    const res = await fetch(`/aws/shoppingCart/${cartID}/${carID}`, {
      method: "DELETE",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    return res.status;
  } catch {
    return 500;
  }
};
