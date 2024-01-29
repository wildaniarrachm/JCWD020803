import { AddSubCategory } from "./AddSubcategory"
import { SubcategoryTable } from "./SubcategoryTable"


export const SubCategoryManagement = () => {
    
    
    return (
        <>
        <div className='bg-main-light h-full w-full rounded-lg'>
        <AddSubCategory/>
        <SubcategoryTable/>
        </div>
        </>
    )
}