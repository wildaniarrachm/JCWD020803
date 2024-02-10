import { IoCloudUploadOutline } from 'react-icons/io5';
import 'aos/dist/aos.css';
export const FormUpImage = ({ selectedImage, handleImageChange, schema }) => {
  return (
    <div
      className="relative bg-gray-300 w-full h-[200px] border rounded-md cursor-pointer"
      style={{
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.7,
      }}
    >
      <h1 className="absolute top-14 left-[40%] text-black/80 laptop:absolute laptop:top-14 laptop:left-[40%]">
        <label htmlFor="uploadInput">
          <IoCloudUploadOutline size={'60px'} />
        </label>
        {selectedImage ? null : (
          <label className="absolute top-14 text-center font-poppins">
            No file choose
          </label>
        )}
      </h1>
      <input
        type="file"
        id="uploadInput"
        name="file"
        className="opacity-0 cursor-pointer absolute top-20 laptop:absolute laptop:top-[47%] laptop:w-full"
        onChange={handleImageChange}
      />
      {schema && schema.images && (
        <div className="text-red-500 w-[200px] h-5">{schema.images}</div>
      )}
    </div>
  );
};
