import { useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { MainCarousel } from '../../components/carousel/Index';
import { CardHome } from '../../components/card-home/Index';

function Home() {
  const [view, setView] = useState(true);
  return (
    <Layout>
      <MainCarousel />
      <CardHome />
    </Layout>
  );
}
export default Home;
