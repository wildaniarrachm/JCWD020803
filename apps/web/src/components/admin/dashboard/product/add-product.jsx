import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';

export const AddProducts = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add products
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Add products.</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-10">
            <Input
              label="Product Name"
              name="product_name"
              variant="static"
              placeholder="Spicy Burger"
            />
            <Input
              label="Product Descriptions"
              name="description"
              variant="static"
              placeholder="Spicy burger with salad and beef inside"
            />
            <Input
              variant="static"
              label="Product Weight"
              placeholder="weight in kg if under 1kg write example:0.3"
              name="weight"
            />
            <Input variant="static" label="Price" name="price" />
            <Select label="Category">
              <Option>Food</Option>
            </Select>
            <Select label="Subcategory">
              <Option>Burger</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
