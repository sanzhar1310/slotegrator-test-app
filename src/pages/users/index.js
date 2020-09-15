import dynamic from 'next/dynamic';
import Head from 'next/head';

const Users = dynamic(() => import('../../features/Users').then((mod) => mod.Users), {
  ssr: false,
});

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <Users />
    </>
  );
};

export default UsersPage;
