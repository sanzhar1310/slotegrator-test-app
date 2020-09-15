import dynamic from 'next/dynamic';
import Head from 'next/head';

const NavBar = dynamic(() => import('../components/NavBar').then((mod) => mod.NavBar), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Main</title>
      </Head>
      <NavBar />
      Main Page
    </>
  );
}
