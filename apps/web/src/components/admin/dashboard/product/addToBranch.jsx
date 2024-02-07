import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { GoPlus } from 'react-icons/go';

export const AddToBranch = ({
  open,
  handleOpen,
  product,
  quantity,
  setQuantity,
  handleSubmit,
}) => {
  return (
    <>
      <Tooltip content="Add into your branch">
        <IconButton
          className="bg-transparent"
          onClick={() => handleOpen(product?.id)}
        >
          <GoPlus size={25} className="text-green-700" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add into your branch</DialogHeader>
        <DialogBody>
          <Input
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e?.target?.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
