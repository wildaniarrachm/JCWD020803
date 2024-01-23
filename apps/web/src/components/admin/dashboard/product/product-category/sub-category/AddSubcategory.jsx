import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Button, Input } from "@material-tailwind/react"





export const AddSubCategory = () => {
    
    return (
        <>
        <div className="flex flex-row justify-between p-16">
            <Input labelProps={{
                className:'hidden'
            }} className="w-[14rem]"/>
            <Input className="w-[14rem]" labelProps={{className:'hidden'}}/>
            <Input className="w-[14rem]" labelProps={{className:'hidden'}}/>
            <Button> Add Subcategory </Button>
        </div>
        </>
    )
}