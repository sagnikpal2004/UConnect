const url = "https://uconnect-backend.onrender.com:443/courses"; 
const base_url = "https://uconnect-backend.onrender.com:443";

export const joinClassCommunity = async (courseId) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyMzg4OTUwfQ.uAQYZdZLmskRvV42C_Dv3ty509T5edV4FQUXpTB_EWk"    // TODO: Replace this with token from AsyncStorage
        // const token = await AsyncStorage.getItem('token');
        // if (!token)
        //     throw new Error("No token found");

        const response = await fetch(`${url}/${courseId}/join`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok)
            throw new Error("Failed to join class community");
        console.log("HAHA", await response.json());

    } catch (error) {
        console.error("Error joining class:", error);
        throw error;
    }
}

export const fetchJoinedClasses = async () => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyMzg4OTUwfQ.uAQYZdZLmskRvV42C_Dv3ty509T5edV4FQUXpTB_EWk"    // TODO: Replace this with token from AsyncStorage
        // const token = await AsyncStorage.getItem('token');
        // if (!token)
        //     throw new Error("No token found");

        const response = await fetch(`${base_url}/auth/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return (await response.json()).course_list;
    } catch (error) {
        console.error("Error fetching joined classes:", error);
        throw error;
    }
}