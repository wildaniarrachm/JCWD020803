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
import { useFormik } from 'formik';
import { uploadImage } from '../../../../utils/customer/upload.image.customer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const ModalUploadImage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state) => state.customer.value);
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });

  const formik = useFormik({
    initialValues: {
      id: user?.id,
      images: '',
    },
    onSubmit: (values, action) => {
      uploadImage(values);
      action.resetForm();
    },
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
        formik.setFieldValue('images', event.target.result);
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
        className="bg-main-blue p-2"
        onClick={handleOpen}
      >
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="xl"
          withBorder="true"
          className="p-0.5"
          color="red"
        />
      </Badge>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Upload Images</DialogHeader>
        <form onSubmit={formik.handleSubmit}>
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
            <Button
              variant="gradient"
              color="pink"
              onClick={handleOpen}
              type="submit"
            >
              <span>Upload</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      ;
    </div>
  );
};
