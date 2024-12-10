const url = "https://uconnect-backend.onrender.com:443/posts"; 
const base_url = "https://uconnect-backend.onrender.com:443";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchPosts = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token)
            throw new Error("No token found");

        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok)
            throw new Error(await response.text());

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};