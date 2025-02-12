import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

const artistIds = [
    { id: "5H4yInM5zmHqpKIoMNAx4r", nationality: "Britânico" },
    { id: "1Xyo4u8uXC1ZmMpatF05PJ", nationality: "Canadense" },
    { id: "5pBMkZNIlbGTH3hrsQJqAa", nationality: "Brasileiro" },
    { id: "6qqNVTkY8uBg9cP3Jd7DAH", nationality: "Americana" },
    { id: "45dkTj5sMRSjrmBSBeiHym", nationality: "Canadense" },
    { id: "7ltDVBr6mKbRvohxheJ9h1", nationality: "Espanhola" },
    { id: "74KM79TiuVKeVCqs8QtB0B", nationality: "Americana" },
    { id: "4NUePmzDvCYqilXBFa91Hg", nationality: "Brasileiro" },
    { id: "4dpARuHxo51G3z768sgnrY", nationality: "Britânica" },
    { id: "1i8SpTcr7yvPOmcqrbnVXY" ,nationality: "República Dominicana"}
];

function fetchToken() {
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '61094d576c204460aacc8f1759eb7141',
            client_secret: 'fd8e6de7bba54d40b97fc2eef0c4221c',
        }),
    })
        .then((response) => response.json())
        .then((data) => data.access_token)
        .catch((error) => {
            console.error('Error fetching token:', error);
            return null;
        });
}

const api = axios.create({
    baseURL: "http://localhost:3030/api",
    withCredentials: true,
});

const createUser = async (name, email, password, role) => {
    try {
        const response = await api.post(`/users`, { name, email, password, role });
        console.log("User created:", response);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await api.post("/users/login", { email, password });
        console.log("Login successful:", response);
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

const createArtist = async (name, nationality, image) => {
    try {
        const response = await api.post("/artists", { name, nationality, image });
        console.log("Artist inserted:", response);
    } catch (error) {
        console.error("Failed creating artist:", error);
    }
};

const getAllArtists = async () => {
    try {
        const response = await api.get("/artists");
        return response.data;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return null;
    }
};

const getArtistDetails = async (artistId, accessToken) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { name, images } = response.data;
        
        return {
            name,
            image: images.length > 0 ? images[0].url : null,
        };
    } catch (error) {
        console.error('Error fetching artist details:', error);
        return null;
    }
};

function MainPage() {
    const [token, setToken] = useState(null);
    const [artistDetails, setArtistDetails] = useState([]);
    const [allArtistsToBeDisplayed, setAllArtistsToBeDisplayed] = useState([]);
    const [hasRun, setHasRun] = useState(false); // State to ensure one-time function execution

    useEffect(() => {
        async function fetchData() {
            if (hasRun) return; // Exit if already run
            setHasRun(true);
            await createUser("Riquelme Batista", "riquelmee@outlook.com", "12345678", "user");
            await loginUser("riquelmee@outlook.com", "12345678");
            
            const fetchedToken = await fetchToken();
            setToken(fetchedToken);
    
            if (fetchedToken) {
                const allArtistsFromSpotify = [];
                for (const artistId of artistIds) {
                    const artist = await getArtistDetails(artistId.id, fetchedToken);
                    if (artist) {
                        allArtistsFromSpotify.push(artist);
                    }
                }
                setArtistDetails(allArtistsFromSpotify);
    
                // Ensure artistDetails is fully updated before proceeding
                for (let i = 0; i < allArtistsFromSpotify.length; i++) {
                    await createArtist(allArtistsFromSpotify[i].name, artistIds[i].nationality, allArtistsFromSpotify[i].image);
                }
    
                const allArtistsFromDatabase = await getAllArtists();
                const lastTenArtists = allArtistsFromDatabase.slice(-10);
                setAllArtistsToBeDisplayed(lastTenArtists);
            }
        }
    
        fetchData();
    }, [hasRun]);
    

  console.log(allArtistsToBeDisplayed);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-[30%] bg-[#000000] text-white flex flex-col overflow-hidden max-w-[263px] ">
                {/* Sticky container */}
                <div className="sticky top-0 pl-2 bg-black h-[100vh] flex flex-col gap-[1rem] items-[center] sm:items-center">
                    <div className="flex gap-[0.2rem]  text-[10px] justify-center pt-[1rem]">
                        <h1 className="hover:text-green-400 text-[1rem] font-[600] sm:text-[2.5rem] ">iSpotify</h1>
                        <i className="fa-regular fa-registered text-[10px] sm:text-[20px] "></i>
                    </div>
                    <button className="cursor-pointer flex gap-[0.1rem] items-center w-[100%] justify-start sm:justify-center">
                        <span className="material-symbols-outlined scale-60 sm:scale-120">album</span>
                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Artistas</h3>
                    </button>
                    <button className="cursor-pointer flex gap-[0.4rem] items-center w-[100%] justify-start sm:justify-center">
                        <span className=""><i className="fa-solid fa-heart text-[10px] sm:text-[20px] "></i></span>
                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Músicas Curtidas</h3>
                    </button>
                    <button className="cursor-pointer flex gap-[0.3rem] items-center pl-[5px] justify-start absolute bottom-0">
                        <i className="fa-solid fa-arrow-right-from-bracket sm:text-[20px]"></i>
                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Logout</h3>
                    </button>
                </div>
                <div className="overflow-y-auto flex-grow p-4"></div>
            </aside>

            {/* Main content (scrollable) */}
            <main className="bg-[#101010] w-auto flex-grow overflow-y-auto h-screen p-0 pt-[4rem]">
                <h2 className="hover:text-green-400 text-white text-center font-[500] pb-[1rem] sm:text-left sm:text-[2rem] pl-[2rem]">Artistas</h2>
                <div className="grid grid-rows-auto justify-center gap-y-[2rem] gap-x-[0.2rem] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-[2rem]">
                    {allArtistsToBeDisplayed.map((artist) => (
                        <ArtistCard key={artist} artist={artist} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MainPage;
