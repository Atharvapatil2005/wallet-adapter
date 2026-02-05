import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletConnectButton,
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { Airdrop } from "./Airdrop";
import { ShowSolBalance } from "./ShowSolBalance";

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
    // create your own rpc url? Alchemy
    return (
        <ConnectionProvider endpoint={"http://127.0.0.1:8899"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <ShowSolBalance />
                    <WalletMultiButton />
                    <WalletDisconnectButton />

                    <div>
                        hi there <b>hello</b>
                    </div>

                    <Airdrop />
                    
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;