export const signIn = async (email: String, password: String): Promise<User | null> => {
  const res = await fetch("/api/auth/", {
    method: "PUT",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 404) return null;
  return res.json();
};

export const registerUser = async (user: Partial<User>): Promise<User | null> => {
  try {
    const res = await fetch("/api/auth/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 201) return await res.json();
    return null;
  } catch {
    return null;
  }
};
