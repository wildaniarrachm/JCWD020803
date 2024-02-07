import { ProfileHeader } from '../../../../components/customers/user-profile/profile-detail/header';
import { EditAddress } from '../../../../components/customers/user-profile/user-address/editAddress';

function EditAddressPage() {
  return (
    <>
      <ProfileHeader
        title={'Edit address'}
        link={'#'}
        textLink={'Edit Address'}
      />
      <EditAddress />
    </>
  );
}

export default EditAddressPage;
