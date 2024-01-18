import { IoCloudUploadOutline } from 'react-icons/io5';
import 'aos/dist/aos.css';
export const FormUpImage = ({ selectedImage, handleImageChange }) => {
 
  return (
    <div
      className="relative bg-gray-300 w-full h-[200px] border rounded-md cursor-pointer"
      style={{
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity:0.7
      }}
    >
      <h1 className="absolute top-20 left-32 text-black/80 laptop:absolute laptop:top-20 laptop:left-[45%]">
        <label htmlFor="uploadInput">
          <IoCloudUploadOutline size={'60px'} />
        </label>
      </h1>
      <input
        type="file"
        id="uploadInput"
        name="images"
        className="opacity-0 cursor-pointer absolute top-20 laptop:absolute laptop:top-[47%] laptop:w-full"
        onChange={handleImageChange}
      />
    </div>
  );
};
