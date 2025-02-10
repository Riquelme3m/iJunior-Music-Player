import React, { useEffect, useState } from "react";
import dummyImage from "../assets/dummy-image.jpg";



function ArtistCard( {artist}) {
  
  return (
    <div className="bg-[#181818] w-[180px] h-[250px] rounded-lg flex flex-col items-start  justify-around pb-[1rem] pt-[0.2rem]">
      <img className="rounded-full object-cover w-[150px] h-[150px] m-auto" src={artist.image || dummyImage} alt={"Artist Picture"} />
      <div className="flex flex-col items-start w-[100%]  pl-[1rem]  gap-[0.7rem]">
        <h4 className="text-white text-[0.9rem] font-[500]">{artist.name || "Banda do molejo"}</h4>
        <h4 className="text-[gray] font-[500] text-[0.9rem]">Artista</h4>
      </div>
    </div>
  );
}

export default ArtistCard;
