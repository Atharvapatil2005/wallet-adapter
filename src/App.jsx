import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

import { Airdrop } from "./Airdrop";
import { ShowSolBalance } from "./ShowSolBalance";
import { SignMessage } from "./SignMessage";
import  { SendTokens } from "./SendTokens";

import '@solana/wallet-adapter-react-ui/styles.css';

function AppContent() {
    const wallet = useWallet();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
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
            <div className="app-header">
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Solana Wallet</h1>
                <span className="network-badge">Devnet</span>
            </div>

            <div className="section-divider" />

            <div className="feature-group">
                <span className="group-header">Wallet</span>
                <ShowSolBalance />
                <WalletMultiButton />
                <WalletDisconnectButton />
            </div>

            {wallet.publicKey && (
                <>
                    <div className="section-divider" />

                    <div className="feature-group">
                        <span className="group-header">Actions</span>
                        <SignMessage />
                    </div>

                    <div className="section-divider" />

                    <div className="feature-group">
                        <span className="group-header">Development</span>
                        <Airdrop />
                    </div>

                    <div className="section-divider" />

                    <div className="feature-group">
                        <span className="group-header">Transfer</span>
                        <SendTokens />
                    </div>
                </>
            )}

            {!wallet.publicKey && (
                <div className="empty-state">
                    <p>Connect your wallet to access all features</p>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <AppContent />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;