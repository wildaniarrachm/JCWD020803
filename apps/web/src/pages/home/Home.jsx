import { useEffect, useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { MainCarousel } from '../../components/carousel/Index';
import { CardHome } from '../../components/card-home/Index';
import { useSelector } from 'react-redux';
import { getDistanceBranch } from '../../utils/branch/get.distance.branch';
import { getProductByBranch } from '../../utils/branch-product/getProductByBranch';

function Home() {
  const position = useSelector((state) => state.position.value);
  const [branch, setBranch] = useState();
  const [productList, setProductList] = useState();
  const delivery = useSelector((state) => state.delivery.value);
  const getDistance = async () => {
    if (position) {
      const response = await getDistanceBranch(
        position?.latitude,
        position?.longitude,
      );
      console.log(response);
      if (response?.status === 200) {
        return setBranch(response?.data?.branches);
      }
    }
  };
  const getProductBranch = async () => {
    if (branch) {
      const response = await getProductByBranch(branch?.id);
      setProductList(response?.data?.results);
      console.log(response);
    }
  };
  console.log(productList);
  useEffect(() => {
    getDistance();
  }, [position, delivery]);

  useEffect(() => {
    getProductBranch();
  }, [branch]);
  return (
    <Layout>
      <MainCarousel branch={branch} deliveried={delivery} />
      <CardHome productList={productList} />
    </Layout>
  );
}
export default Home;
