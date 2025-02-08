import React from "react";
import ArtistCard from "../components/ArtistCard";

function MainPage() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-[30%] bg-[#000000] text-white flex flex-col overflow-hidden max-w-[263px] ">
                {/* Sticky container */}
                <div className="sticky top-0 pl-2 bg-black h-[100vh] flex flex-col gap-[1rem] items-[center] sm:items-center">
                    <div className="flex gap-[0.2rem] pt-[2rem] text-[10px] justify-center pt-[1rem]">
                        <h1 className="hover:text-green-400 text-[1rem] font-[600] sm:text-[2.5rem] ">iSpotify</h1>
                        <i className="fa-regular fa-registered text-[10px] sm:text-[20px] "></i>
                    </div>

                    {/* Wrapped in button */}
                    <button className="cursor-pointer  flex gap-[0.1rem] items-center w-[100%] justify-start sm:justify-center">
                        <span className="  material-symbols-outlined scale-60 sm:scale-120">album</span>
                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]" >Artistas</h3>
                    </button>

                    {/* Wrapped in button */}
                    <button className="cursor-pointer  flex gap-[0.4rem] items-center w-[100%] justify-start sm:justify-center">
                        <span className=""><i className="fa-solid fa-heart text-[10px] sm:text-[20px] "></i></span>

                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem]">Músicas Curtidas</h3>
                    </button>

                    {/* Wrapped in button */}
                    <button className="cursor-pointer flex gap-[0.3rem] items-center pl-[5px] justify-start absolute bottom-0">
                        <i className="fa-solid fa-arrow-right-from-bracket sm:text-[20px]"></i>
                        <h3 className="hover:text-green-400 text-[0.7rem] font-[500] sm:text-[1.1rem] ">Logout</h3>
                    </button>
                </div>

                {/* Scrollable content in sidebar */}
                <div className="overflow-y-auto flex-grow p-4">
                    {/* Add content here if needed */}
                </div>
            </aside>

            {/* Main content (scrollable) */}
            <main className="bg-[#101010] w-auto flex-grow overflow-y-auto h-screen p-0 pt-[4rem]">
                <h2 className="hover:text-green-400 text-white text-center font-[500] pb-[1rem] sm:text-left sm:text-[2rem] pl-[2rem] ">Artistas</h2>
                <div className="grid grid-rows-auto justify-center gap-y-[2rem] gap-x-[0.2rem] sm:grid-cols-2   lg:grid-cols-3 xl:grid-cols-5 p-[2rem]">
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                </div>
            </main>
        </div>
    );
}

export default MainPage;
