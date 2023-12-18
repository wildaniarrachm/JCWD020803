import {
  Button,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from '@material-tailwind/react';
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationScheme = Yup.object({
    password: Yup.string().min(4, 'Minimum 4 characters'),
  });

export default function MobileLoginAdmin() {
    const handleSubmit = async (data) => {
        try {
          console.log(data);
            if (data.input_data.includes("@")) {
              data.email = data.input_data;
              delete data.input_data;
              const response = await axios.post(
                `http://localhost:2000/users/login`,
                data
              );
              notify();
              setUser(response.data[0]);
              localStorage.setItem("token", response.data?.token);
              navigate("/discovery");
              window.location.reload();
            } else {
              data.username = data.input_data;
              delete data.input_data;
              const response = await axios.post(
                `http://localhost:2000/users/login`,
                data
              );
              setUser(response.data[0]);
              localStorage.setItem("token", response.data?.token);
              navigate("/");
              window.location.reload();
            }
            console.log(response.data[0]);
        } catch (err) {
          console.log(err);
        }
      };
      
      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: validationScheme,
        onSubmit: (values, action) => {
          handleSubmit(values);
          action.resetForm();
        },
      });
    return (
    <>
      <div className="items-center justify-center pt-40 min-h-screen bg-main-light">
        <div className="w-auto bg-main-light">
          <Typography
            className="font-poppins text-main-red ml-6"
            variant="h3"
            color="white"
          >
            Sign In
          </Typography>
          <form 
          onSubmit={formik.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input label="Email or Username" size="lg" />
              <Input label="Password" size="lg" />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                className="bg-main-blue font-poppins"
                fullWidth
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
    </>
  );
}
