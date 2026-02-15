import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { Airdrop } from "./Airdrop";
import { ShowSolBalance } from "./ShowSolBalance";
import { SignMessage } from "./SignMessage";
import  { SendTokens } from "./SendTokens";

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
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
                        
                        <Airdrop />
                        <SendTokens />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;