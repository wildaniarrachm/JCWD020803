import { Typography } from "@material-tailwind/react"
import test from '../../assets/admin-picture.png'



export const ProductDetail = () => {
    return (
        <>
        <div className="flex flex-col pl-3">
            <img src={test} />
            <div className="flex flex-col ml-8 desktop:  ">
            <Typography variant="h3" className="font-poppins text-main-blue"> Sukro </Typography>
            <Typography variant="h2" className="font-poppins text-main-red"> Rp 10000 </Typography>
            <Typography className="font-poppins text-xl"> Deskripsi </Typography>
            </div>
        </div>
        </>
    )
}