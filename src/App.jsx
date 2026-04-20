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
        <div className="main-card"
        >
            <div className="app-header">
                <div className="logo-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <h1>Solana Wallet</h1>
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