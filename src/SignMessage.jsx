import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert(`Message signature: ${bs58.encode(signature)}`);
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
            />
            <button onClick={onClick} className="btn-primary">
                Sign Message
            </button>
        </div>
    );
}