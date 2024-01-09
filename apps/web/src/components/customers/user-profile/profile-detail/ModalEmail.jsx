import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FormEditEmail } from './FormEditEmail';

export const ModalEmail = ({ email }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="outlined"
        className="rounded-lg"
        size="md"
      >
        <FaRegEdit size={16} />
      </IconButton>
      <Dialog size={'sm'} open={open} handler={handleOpen}>
        <DialogHeader>Change Email</DialogHeader>
        <DialogBody>
          <FormEditEmail email={email} />
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={() => handleOpen(null)}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
