export const StoreLocation = ({ deliveried, branch }) => {
  let distance = null;
  if (branch?.distance !== 0) {
    distance = branch?.distance?.toFixed(3);
  } else {
    distance = branch?.distance + ',000';
  }
  return (
    <div className="font-poppins rounded-lg w-[50%] my-2 laptop:py-2 laptop:px-1 overflow-hidden">
      <div
        className={`${
          deliveried ? 'flex justify-center' : 'flex justify-start'
        } laptop:flex laptop:justify-start`}
      >
        <div className="flex flex-col">
          <small
            className={`${
              distance ? 'text-center' : 'text-start'
            } font-bold text-[10px] text-center tablet:text-sm`}
          >
            {branch?.branch?.branch_name}{' '}
            {`${distance ? distance + ' Km' : ''}`}
            {branch?.branch?.head_store === true ? ' (Head store)' : ''}
          </small>
          <small className="text-gray-500 text-[10px] text-center tablet:text-start tablet:text-sm">
            {branch?.branch?.address}
          </small>
        </div>
      </div>
    </div>
  );
};
