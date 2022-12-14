import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { PingButton } from '../components/PingButton'
import { SendSOL } from '../components/SendSOL'
import Head from 'next/head'

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>ATO</title>
        <meta
          name="description"
          content="ATO"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <PingButton />
          <SendSOL />
        </div>
      </WalletContextProvider >
    </div>
  );
}

export default Home;