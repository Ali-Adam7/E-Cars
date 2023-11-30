const URL = process.env.NEXT_URL || "http://localhost:3000";
export const getFilteredCars = async (queryString: string): Promise<Car[]> => {
  try {
    const response = await fetch(`/api/catalog/${queryString}`);
    if (response.status === 200) return await response.json();
    return [];
  } catch {
    return [];
  }
};

export const getMakes = async (): Promise<string[]> => {
  try {
    const carMakes = await fetch("/api/catalog/makes/all");
    if (carMakes.status == 200) return await carMakes.json();
    return [];
  } catch (error) {
    return [];
  }
};

export const getCarById = async (id: number): Promise<Car | null> => {
  try {
    const car = await fetch(`${URL}/api/catalog/${id}`, { cache: "no-cache" });

    if (car.status == 200) return await car.json();
    return null;
  } catch {
    return null;
  }
};

export const getRecommendation = async (car: Car) => {
  try {
    const cars = await fetch(`${URL}/api/catalog/car/recommender`, {
      method: "PUT",
      body: JSON.stringify(car),
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (cars.status == 200) {
      const result: any = await cars.json();
      const recommender: Car[] = [];

      result.forEach((car: any) => {
        if (car[1] > 0.5) recommender.push(car[0]);
      });
      return recommender;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getReviews = async (id: number): Promise<Review[]> => {
  try {
    const reviews = await fetch(`${URL}/api/catalog/review/${id}`, { cache: "no-cache" });
    if (reviews.status == 200) return await reviews.json();
    return [];
  } catch {
    return [];
  }
};

export const postReview = async (review: Review, id: number): Promise<void> => {
  try {
    const res = await fetch(`/api/catalog/review/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
  } catch {
    console.log("Review not submitted");
  }
};

export const getDeals = async (): Promise<Car[]> => {
  try {
    const res = await fetch(`${URL}/api/catalog/deals/all/`, { cache: "no-cache" });
    if (res.status == 200) return await res.json();
    return [];
  } catch {
    return [];
  }
};
