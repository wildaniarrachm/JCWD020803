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
import { addPhoneNumber } from '../../../../utils/customer/add.phone.number';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';

export const ModalPhone = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.customer.value);
  const [phone_number, setPhone_number] = useState();
  const handleSubmit = async () => {
    const data = {
      id: user.id,
      phone_number: phone_number,
    };
    if (data.phone_number === '' || data.phone_number === undefined) {
      toast.error('Please enter a phone number', {
        position: 'top-right',
        autoClose: 3000,
      });
      handleOpen(null);
      return;
    }
    if (data.phone_number === user.phone_number) {
      toast.error('Your phone number is already', {
        position: 'top-right',
        autoClose: 3000,
      });
      handleOpen(null);
      return;
    }
    const response = await addPhoneNumber(data, token);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 3000,
        position: 'top-right',
      });
      handleOpen(null);
      window.location.reload();
    } else {
      toast.error(response?.response?.data, {
        autoClose: 3000,
        position: 'top-right',
      });
      handleOpen(null);
    }
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="outlined"
        className="rounded-full"
        size="md"
      >
        <FaRegEdit size={16} />
      </IconButton>
      <Dialog size={'sm'} open={open} handler={handleOpen}>
        <DialogHeader>Enter Phone Number.</DialogHeader>
        <DialogBody>
          <PhoneInput
            name="phone_number"
            defaultCountry="ID"
            international="true"
            placeholder={user?.phone_number}
            value={phone_number}
            onChange={setPhone_number}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={handleSubmit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
