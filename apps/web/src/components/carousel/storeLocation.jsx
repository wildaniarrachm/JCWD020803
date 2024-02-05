
export const StoreLocation = ({ deliveried, branch, distances }) => {
  return (
    <div className="font-poppins rounded-lg w-[50%] laptop:py-2 laptop:px-1 overflow-hidden">
      <div
        className={`${
          deliveried ? 'flex justify-center' : 'flex justify-start'
        } laptop:flex laptop:justify-start`}
      >
        <div className="flex flex-col">
          <small className="font-bold laptop:text-sm">
            {branch?.branch_name} {`${distances ? distances + ' Km' : ''}`}
          </small>
          <small className="text-gray-500 text-[10px] laptop:text-sm">
            {branch?.address}
          </small>
        </div>
      </div>
    </div>
  );
};
