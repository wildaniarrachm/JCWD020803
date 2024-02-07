import {
  Button,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const HeaderBranch = ({ TABS, setFill }) => {
  const navigate = useNavigate();
  return (
    <>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-main-light font-poppins"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Branch list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => navigate('/branch/new-branch')}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add branch
            </Button>
          </div>
        </div>
      </CardHeader>
    </>
  );
};
