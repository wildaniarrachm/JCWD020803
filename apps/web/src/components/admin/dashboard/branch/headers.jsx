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
            <Typography color="gray" className="mt-1 font-normal">
              See information about all branch
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => navigate('/branch/new-branch')}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add branch
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value='all' className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
    </>
  );
};
