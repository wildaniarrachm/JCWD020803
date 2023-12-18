
import { useState } from 'react';
import { MobilePage } from '../../components/landing-page/mobile-view/Index';

function Home() {
  const [view, setView] = useState(true);
  return(
    <div>
      {view?(

      <MobilePage>
        
      </MobilePage>
      ):(
        <h1>Deastop</h1>
      )}
    </div>
  )
export default Home;
