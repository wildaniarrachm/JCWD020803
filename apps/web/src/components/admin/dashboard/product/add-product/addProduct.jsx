import {
  Input,
  Option,
  Select,
  Textarea,
  Typography,
  Button,
} from '@material-tailwind/react';

export const AddProduct = () => {
  return (
    <>
      <div className="flex flex-col w-screen px-5 py-10">
        <Typography variant="h4" className="font-poppins text-main-blue">
          {' '}
          Add Product{' '}
        </Typography>
        <div className="w-screen h-screen ">
          <div className="flex flex-row gap-[20px]">
            <div className="flex flex-col">
              <Typography> Name </Typography>
              <Input variant="static" />
            </div>
            <div className="flex flex-col">
              <Typography> Quantity </Typography>
              <Input variant="static" />
            </div>
            <div className="flex flex-col">
              <Typography> Price </Typography>
              <Input variant="static" />
            </div>
            <div className="flex flex-col">
              <Typography> Weight </Typography>
              <Input variant="static" />
            </div>
          </div>
          <div className="flex flex-row gap-[20px]">
            <div className="flex flex-col">
              <Typography> Image </Typography>
              <Input type="file" variant="static" />
            </div>
            <div className="flex flex-col">
              <Typography> Category </Typography>
              <Select variant="static">
                <Option>Wildan</Option>
              </Select>
            </div>
            <div className="flex flex-col">
              <Typography> Subcategory </Typography>
              <Select variant="static">
                {' '}
                <Option> Wildan again </Option>
              </Select>
            </div>
          </div>
          <div className='flex flex-col w-[50rem] gap-[20px]'>
            <Typography> Description </Typography>
            <Textarea label='Description' className='w-96'/>
          </div>
          <Button type='submit' className='bg-main-blue font-poppins'> + Add Product </Button>
        </div>
      </div>
    </>
  );
};
