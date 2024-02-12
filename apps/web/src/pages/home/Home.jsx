import { useEffect, useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { MainCarousel } from '../../components/carousel/Index';
import { CardHome } from '../../components/card-home/Index';
import { useSelector } from 'react-redux';
import { getDistanceBranch } from '../../utils/branch/get.distance.branch';
import { getProductByBranch } from '../../utils/branch-product/getProductByBranch';
import { toast } from 'react-toastify';

function Home({ placeName }) {
  const position = useSelector((state) => state.position.value);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(6);
  const [count, setCount] = useState();
  const [branch, setBranch] = useState();
  const [productList, setProductList] = useState();
  const delivery = useSelector((state) => state.delivery.value);
  const handleMore = () => {
    if (page <= count) {
      setPage(page * 2);
    }
    getProductBranch();
  };
  const getDistance = async () => {
    if (position) {
      const response = await getDistanceBranch(
        position[0]?.latitude,
        position[0]?.longitude,
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
      setLoad(true);
      const response = await getProductByBranch(branch?.branch?.id, page);
      setCount(response?.data?.count);
      setProductList(response?.data?.results);
      setLoad(false);
    }
  };

  useEffect(() => {
    getDistance();
  }, [position]);

  useEffect(() => {
    getProductBranch();
  }, [branch, page]);
  return (
    <Layout placeName={placeName}>
      <MainCarousel branch={branch} deliveried={delivery} />
      <CardHome
        productList={productList}
        handleMore={handleMore}
        page={page}
        count={count}
        load={load}
      />
    </Layout>
  );
}
export default Home;
