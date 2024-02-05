import { Button, CardFooter, Typography } from '@material-tailwind/react';

export const FooterBranch = ({ setPage, page, totalPages }) => {
  const handleNextPages = () => {
    setPage((page += 1));
  };
  const handlePrevPages = () => {
    setPage((page -= 1));
  };
  console.log(page);
  return (
    <>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 font-poppins">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {page} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePrevPages}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            disabled={page >= totalPages}
            variant="outlined"
            size="sm"
            onClick={handleNextPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};
