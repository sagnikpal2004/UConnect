const BASE_URL = "https://uconnect-backend.onrender.com"; 

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
  
      const text = await response.text(); // Get raw response
      console.log("Register Response Status:", response.status);
      console.log("Register Response Body:", text);
  
      if (!response.ok) {
        let errorMessage = "Registration failed";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response is not JSON
        }
        throw new Error(errorMessage);
      }
  
      const data = JSON.parse(text);
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
  
      const text = await response.text(); // Get raw response
      console.log("Login Response Status:", response.status);
      console.log("Login Response Body:", text);
  
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid credentials");
      }
  
      if (response.status === 404) {
        throw new Error("Not Found: User does not exist");
      }
  
      if (!response.ok) {
        let errorMessage = "Login failed";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response is not JSON
        }
        throw new Error(errorMessage);
      }
  
      const data = JSON.parse(text);
      return data.token;
    } catch (error) {
      console.error("Login User Error:", error);
      throw error;
    }
  };
  