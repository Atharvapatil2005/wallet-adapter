import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchBalance() {
            if (!wallet.publicKey) return;

            setLoading(true);
            try {
                const lamports = await connection.getBalance(wallet.publicKey);
                if (!cancelled) {
                    setBalance(lamports / LAMPORTS_PER_SOL);
                }
            } catch (err) {
                console.error("Failed to fetch balance:", err);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchBalance();

        return () => {
            cancelled = true;
        };
    }, [wallet.publicKey, connection]);

    return (
        <div className="dashboard-section" style={{ alignSelf: 'stretch' }}>
            <p className="section-title">SOL Balance</p>
            <div className={`section-value ${loading ? 'loading-skeleton' : ''}`}>
                {loading ? (
                    <span className="skeleton-text" />
                ) : balance !== null ? (
                    `${balance} SOL`
                ) : (
                    "Connect wallet to view balance"
                )}
            </div>
        </div>
    );
}