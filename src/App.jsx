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
                            gap: '28px',
                            padding: '32px 40px',
                            maxWidth: '440px',
                            width: '100%',
                            background: 'var(--card-bg)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '16px',
                            boxShadow: 'var(--card-shadow)',
                            transition: 'box-shadow 0.2s ease',
                        }}
                    >
                        <ShowSolBalance />
                        <WalletMultiButton />
                        <WalletDisconnectButton />
                        <SignMessage />
                        <Airdrop />
                        <SendTokens />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;