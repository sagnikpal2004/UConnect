import AsyncStorage from "@react-native-async-storage/async-storage";
const url = "https://uconnect-backend.onrender.com:443/courses";

export const fetchClassCommunity = async () => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyMzg4OTUwfQ.uAQYZdZLmskRvV42C_Dv3ty509T5edV4FQUXpTB_EWk"    // TODO: Replace this with token from AsyncStorage
        // const token = await AsyncStorage.getItem('token');
        // if (!token)
        //     throw new Error("No token found");

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

export const fetchClassCommunityById = async (classId) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyMzg4OTUwfQ.uAQYZdZLmskRvV42C_Dv3ty509T5edV4FQUXpTB_EWk"    // TODO: Replace this with token from AsyncStorage
        // const token = await AsyncStorage.getItem('token');
        // if (!token)
        //     throw new Error("No token found");

        const response = await fetch(`${url}/${classId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch class community data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createClassCommunity = async (classData) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyMzg4OTUwfQ.uAQYZdZLmskRvV42C_Dv3ty509T5edV4FQUXpTB_EWk"    // TODO: Replace this with token from AsyncStorage
        // const token = await AsyncStorage.getItem('token');
        // if (!token)
        //     throw new Error("No token found");
        
        const response = await fetch(`${url}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(classData)
        });
        
        if (!response.ok) {
            throw new Error("Failed to create class community");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};