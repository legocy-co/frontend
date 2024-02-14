import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { UserProfileForm } from '../../../features/user-profile';

export const UpdateUserProfilePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/collection'}>Update profile</PageHeading>
      <UserProfileForm />
    </div>
  );
};
