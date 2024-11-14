const url = "http://uconnect-backend.onrender.com:80/user"; 
// CHANGE TO USE jwttoken INSTEAD of USER_ID

export const joinClassCommunity = async (courseId, userId=1) => {
    try {
        const response = await fetch(`${url}/connect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, courseId })
        });
        if (!response.ok)
            throw new Error("Failed to join class community");
        console.log("HAHA", await response.json());

    } catch (error) {
        console.error("Error joining class:", error);
        throw error;
    }
}

export const fetchJoinedClasses = async (userId=1) => {
    try {
        const response = await fetch(`${url}/classList/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching joined classes:", error);
        throw error;
    }
}