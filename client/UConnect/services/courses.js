const url = "http://103.211.23.35:3001/classCommunity"; 

export const fetchClassCommunity = async () => {
    try {
        const response = await fetch(`${url}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
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
};

export const createClassCommunity = async (classData) => {
    try {
        const response = await fetch(`${url}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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