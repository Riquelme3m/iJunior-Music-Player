import React from "react";
import dummyImage from "../assets/dummy-image.jpg";



function ArtistCard() {
    return (
        <div className="bg-[#181818] w-[196px] h-[280px] rounded-lg flex flex-col items-center justify-around  pb-[1rem] pt-[0.2rem] ">
            <img className="rounded-full w-[160px] " src={dummyImage} alt="artist picture" />
            <div className="flex flex-col items-start  gap-[0.7rem]">
                <h4 className="text-white text-[0.9rem] font-[500] ">Engenheiros do Hawaii</h4>
                <h4 className="text-[gray] font-[500] text-[0.9rem] ">Artista</h4>
            </div>

            {/*width:196px height 280px*/}
        </div>
    );
}

export default ArtistCard;