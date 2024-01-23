import { Input } from "@material-tailwind/react"
import { IoIosSearch } from "react-icons/io";

export const NavSearch = () => {

    return (
        <>
        <Input placeholder="Search Product" 
        labelProps={{className:'hidden'}}
        className="bg-white w-[27rem] rounded-r-none focus:!border-main-blue"/>
        <button className="bg-main-blue h-10 w-16 items-center ml-[-7px] rounded-l-none rounded-r-lg">
            <div className=" flex items-center justify-center">
            <IoIosSearch size={'25px'}/>
            </div>
        </button>
        </>
    )
}