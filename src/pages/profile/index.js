import Head from 'next/head';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('../../features/Profile').then((mod) => mod.Profile), {
  ssr: false,
});

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </>
  );
};

export default ProfilePage;
