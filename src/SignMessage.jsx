import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    async function onClick() {
        if (!publicKey) return;
        if (!signMessage) {
            setResult({ type: 'error', message: 'Wallet does not support message signing!' });
            return;
        }
        if (!message.trim()) {
            setResult({ type: 'error', message: 'Please enter a message' });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
                throw new Error('Message signature invalid!');
            }

            setResult({
                type: 'success',
                message: `Signature: ${bs58.encode(signature).slice(0, 20)}...`,
                fullSignature: bs58.encode(signature)
            });
        } catch (err) {
            setResult({ type: 'error', message: err.message || 'Failed to sign message' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-section" style={{ alignSelf: 'stretch' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', textAlign: 'center' }}>
                Sign Message
            </h2>
            <p className="section-title" style={{ textAlign: 'center', marginBottom: 4 }}>
                Prove ownership by signing a message with your wallet.
            </p>
            <input
                id="message"
                type="text"
                placeholder="Enter message to sign"
                className="dashboard-input"
                style={{ marginBottom: 4 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
            />
            <button
                onClick={onClick}
                className="btn-primary"
                disabled={loading}
            >
                {loading ? "Signing..." : "Sign Message"}
            </button>
            {result && (
                <div className={`result-message ${result.type}`}>
                    {result.message}
                    {result.fullSignature && (
                        <button
                            className="copy-btn"
                            onClick={() => navigator.clipboard.writeText(result.fullSignature)}
                        >
                            Copy
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}