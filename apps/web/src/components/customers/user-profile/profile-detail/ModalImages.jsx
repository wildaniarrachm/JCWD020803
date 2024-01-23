import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { FormUpImage } from './FormUpImage';
import { useSelector } from 'react-redux';
import { uploadImage } from '../../../../utils/customer/upload.image.customer';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const ModalUploadImage = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });

  const user = useSelector((state) => state.customer.value);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const handleOpen = () => setOpen(!open);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('file', image);
    const response = await uploadImage(formData, token);
    console.log(response);
    handleOpen();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div data-aos="fade-up">
      <Badge
        overlap="circular"
        withBorder
        placement="bottom-end"
        content={<MdOutlineCameraAlt />}
        className="bg-main-blue p-2 cursor-pointer"
        onClick={handleOpen}
      >
        <Avatar
          src={user?.images}
          alt={`${user?.first_name} Images`}
          size="xl"
          withBorder="true"
          className="p-0.5 text-[12px]"
          color="red"
          
        />
      </Badge>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Upload Images</DialogHeader>
        <form>
          <DialogBody>
            <FormUpImage
              selectedImage={selectedImage}
              handleImageChange={handleImageChange}
            />
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
            <Button variant="gradient" color="pink" onClick={handleSubmit}>
              <span>Upload</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      ;
    </div>
  );
};
