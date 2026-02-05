import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { Airdrop } from "./Airdrop";
import { ShowSolBalance } from "./ShowSolBalance";
import { SignMessage } from "./SignMessage";

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
    return (
        <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            padding: '24px',
                        }}
                    >
                        <ShowSolBalance />
                        <SignMessage />
                        <WalletMultiButton />
                        <WalletDisconnectButton />
                        <div>
                            hi there <b>hello</b>
                        </div>
                        <Airdrop />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;