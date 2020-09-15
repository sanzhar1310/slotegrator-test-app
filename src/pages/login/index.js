import Head from 'next/head';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../../features/Login').then((mod) => mod.Login), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
