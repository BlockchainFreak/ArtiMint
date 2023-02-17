import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil'

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, polygonMumbai, zkSyncTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

const { chains, provider, webSocketProvider } = configureChains(
  // Add the chains you want to support
  [
    polygonMumbai,
    mainnet,
    polygon,
    zkSyncTestnet,
  ],

  // Adding Alchemy API Key and Public Provider
  ALCHEMY_API_KEY ?
    ([
      alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
      publicProvider(),
    ]) :
    (
      [publicProvider()]
    )
)

// Get the default wallets
const { wallets } = getDefaultWallets({
  appName: 'AI DAPP',
  chains,
})

// App Info
const demoAppInfo = {
  appName: 'AI DAPP',
}

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app',
});


// Create the connectors
// A connector is a wallet that can be used to connect to the app
const connectors = connectorsForWallets([

  ...wallets,
  {
    groupName: 'Other',
    // adding wallets: Argent, Trust, Ledger
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
])

// Create the client, which will be used to connect to the app
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}
