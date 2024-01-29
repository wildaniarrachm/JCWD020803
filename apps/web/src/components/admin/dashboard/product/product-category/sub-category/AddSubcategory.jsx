import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react"
import { useFormik } from "formik"
import { addSubCategory, addSubCategorySchema } from "../../../../../../utils/product/addSubCategory.product";




export const AddSubCategory = () => {
    const formik = useFormik({
        initialValues: {
            Subcategory_name:'',
            CategoryId:''
        },
        validationSchema: addSubCategorySchema,
        onSubmit: (values, action) => {
            console.log(values);
            addSubCategory(values)
        }
    });


    return (
        <>
        <div className="flex flex-row gap-[4rem] p-14">
            <div className=" flex flex-col gap-4">
                <Typography className="font-poppins text-main-blue text-[20px]"> Subcategory </Typography>
                <Input 
                label="Search Subcategory"
                className="w-[14rem]"
            icon={<MagnifyingGlassIcon />}/>
            </div>
            <form onSubmit={formik.handleSubmit}>
            <div className=" flex flex-col gap-4">
                <Typography className="font-poppins text-main-blue text-[20px]"> Input Subcategory </Typography>
                <Input
                name="Subcategory_name"
                value={formik.values.Subcategory_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Subcategory_name && Boolean(formik.errors.Subcategory_name)}
                required
                className="w-[14rem]" label="input subcategory" />
            </div>
            <div className="flex flex-col gap-4">
                <Typography className="font-poppins text-main-blue text-[20px]"> Category </Typography>
                <div className="flex flex-row gap-2">
                    <Select
                    value=""
                    label="Select Category" > <Option> wildan</Option>
                    </Select>
                <Button className="bg-main-blue w-[18rem] font-poppins"> + Add Subcategory </Button>
                </div>
            </div>
            </form>
        </div>
        </>
    )
}