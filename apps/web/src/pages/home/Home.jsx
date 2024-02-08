import { useEffect, useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { MainCarousel } from '../../components/carousel/Index';
import { CardHome } from '../../components/card-home/Index';
import { useSelector } from 'react-redux';
import { getDistanceBranch } from '../../utils/branch/get.distance.branch';
import { getProductByBranch } from '../../utils/branch-product/getProductByBranch';
import { toast } from 'react-toastify';

function Home() {
  const position = useSelector((state) => state.position.value);
  const [branch, setBranch] = useState();
  const [productList, setProductList] = useState();
  const [distance, setDistance] = useState();
  const delivery = useSelector((state) => state.delivery.value);
  const reload = () => window.location.reload();
  const getDistance = async () => {
    if (position) {
      const response = await getDistanceBranch(
        position?.latitude,
        position?.longitude,
      );
      if (response?.status === 200) {
        setBranch(response?.data);
      } else {
        toast.warn(response?.response?.data, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };
  const getProductBranch = async () => {
    if (branch) {
      const response = await getProductByBranch(branch?.branch?.id);
      setProductList(response?.data?.results);
    }
  };

  useEffect(() => {
    getDistance();
  }, [position]);

  useEffect(() => {
    getProductBranch();
  }, [branch]);
  return (
    <Layout>
      <MainCarousel branch={branch} deliveried={delivery} distance={distance} />
      <CardHome productList={productList} />
    </Layout>
  );
}
export default Home;
