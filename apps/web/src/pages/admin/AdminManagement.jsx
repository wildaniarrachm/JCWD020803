import { useEffect, useState } from 'react';
import { Layout } from '../../components/admin/dashboard/Index';
import { AdminTable } from '../../components/admin/dashboard/admin-management/admintable';
import { getAdminData } from '../../utils/admin/getadmindata.admin';

export const AdminManagement = () => {
  const [adminData, setAdminData]=useState()
  const tokenAdmin=localStorage.getItem('tokenAdmin');

  useEffect(() => {
    if (tokenAdmin) {
      const fetchData=async()=>{
        try{
          const response= await getAdminData(tokenAdmin);
          setAdminData(response.data.adminData)
          console.log(adminData, 'goku');
          // console.log(response.data.adminData, 'simba');
        }catch(error){
          return console.error();
        }
      }
      fetchData()
      // getAdminData(tokenAdmin);
      
      // console.log(adminData, 'wildan');
    } else {
      return;
    }
  }, [tokenAdmin]);

  return (
    <>
      <Layout>
        <AdminTable adminData={adminData}/>
      </Layout>
    </>
  );
};

