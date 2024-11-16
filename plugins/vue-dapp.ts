import { defineNuxtPlugin } from '#app'
import { useVueDapp, BrowserWalletConnector } from '@vue-dapp/core'
import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { CoinbaseWalletConnector } from '@vue-dapp/coinbase'

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;

  const { addConnectors } = useVueDapp()

  // Add wallet connectors
  addConnectors([
    new BrowserWalletConnector(),
    new WalletConnectConnector({
      projectId: 'd1e65611568666138126d315c0bafd7d', // Replace with your WalletConnect project ID
      chains: [1], // Ethereum Mainnet
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'light',
        enableExplorer: true,
      },
    }),
    new CoinbaseWalletConnector({
      appName: 'Vue Dapp',
      jsonRpcUrl: 'https://sepolia.optimism.io', // Replace with your preferred RPC URL
    }),
  ])
})