const BASE_URL = "https://uconnect-backend.onrender.com:443"; 

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Register User Error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid credentials");
    }

    if (response.status === 404) {
      throw new Error("Not Found: User does not exist");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Login User Error:", error);
    throw error;
  }
};
