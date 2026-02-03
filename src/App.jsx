import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { Airdrop } from "./airdrop";
// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';


function App() {

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            
           <div>
            hi there <b> hello</b>
           </div>
           <input type="text" placeholder="amount"></input>
           <button>send Airdrop</button>
        </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>

  )
}

export default App
