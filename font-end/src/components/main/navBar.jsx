import { useState,useEffect } from "react";

function Nav({ position, Username }) {
    useEffect (()=>{
        console.log(Username)
    })
    return (
        <div className="relative">
            <div className="w-full h-[50px] flex justify-end items-center p-[30px] absolute top-0 left-0 z-10 border-b-2 border-solid border-gray-500">
                <p>{position}: {Username}</p>
            </div>
        </div>

    )
}
export default Nav