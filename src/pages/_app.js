import { Provider } from 'react-redux';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { useStore } from '../redux/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
