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
                <div className="group-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                        <circle cx="18" cy="12" r="2"/>
                    </svg>
                    Wallet
                </div>
                <ShowSolBalance />
                <WalletMultiButton />
                <WalletDisconnectButton />
            </div>

            {wallet.publicKey && (
                <>
                    <div className="section-divider" />

                    <div className="feature-group">
                        <div className="group-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                            Actions
                        </div>
                        <SignMessage />
                    </div>

                    <div className="section-divider" />

                    <div className="feature-group">
                        <div className="group-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4"/>
                                <path d="M12 18v4"/>
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M4.93 4.93l2.83 2.83"/>
                                <path d="M16.24 16.24l2.83 2.83"/>
                                <path d="M2 12h4"/>
                                <path d="M18 12h4"/>
                                <path d="M4.93 19.07l2.83-2.83"/>
                                <path d="M16.24 7.76l2.83-2.83"/>
                            </svg>
                            Development
                        </div>
                        <Airdrop />
                    </div>

                    <div className="section-divider" />

                    <div className="feature-group">
                        <div className="group-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            Transfer
                        </div>
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