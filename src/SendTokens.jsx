import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";


export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    async function sendTokens() {
        if (!to.trim()) {
            setResult({ type: 'error', message: 'Enter a recipient address' });
            return;
        }
        if (!amount || Number(amount) <= 0) {
            setResult({ type: 'error', message: 'Enter a valid amount' });
            return;
        }

        let recipient;
        try {
            recipient = new PublicKey(to);
        } catch {
            setResult({ type: 'error', message: 'Invalid recipient address' });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: recipient,
                lamports: Number(amount) * LAMPORTS_PER_SOL,
            }));

            const signature = await wallet.sendTransaction(transaction, connection);
            setResult({ type: 'success', message: `Sent ${amount} SOL`, signature });
            setTo("");
            setAmount("");
        } catch (err) {
            setResult({ type: 'error', message: err.message || 'Transaction failed' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="dashboard-section" style={{ alignSelf: 'stretch' }}>
            <p className="section-title">Send SOL</p>
            <input
                id="to"
                type="text"
                placeholder="Recipient address"
                className="dashboard-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={loading}
            />
            <input
                id="amount"
                type="text"
                placeholder="Amount (SOL)"
                className="dashboard-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
            />
            <button
                onClick={sendTokens}
                className="btn-primary"
                disabled={loading}
            >
                {loading ? "Sending..." : "Send"}
            </button>
            {result && (
                <div className={`result-message ${result.type}`}>
                    {result.message}
                    {result.signature && (
                        <a
                            href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tx-link"
                        >
                            View
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default SendTokens;