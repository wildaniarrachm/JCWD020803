import { ProfileBreadcumbs } from './profile-detail/Breadcrumb';

export const ProfileNavigation = ({ title, link, textLink }) => {
  return (
    <div className="flex flex-col items-center relative top-[50px]">
      <h1
        className="text-center font-poppins text-[30px] font-bold"
        data-aos="fade-left"
        data-aos-duration="2000"
      >
        {title}
      </h1>
      <div>
        <ProfileBreadcumbs link={link} textLink={textLink} />
      </div>
    </div>
  );
};
