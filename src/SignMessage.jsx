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
        <div
            style={{
                maxWidth: '420px',
                margin: '0 auto',
                padding: '28px',
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
        >
            <h2
                style={{
                    margin: '0 0 8px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#111',
                    textAlign: 'center',
                }}
            >
                Sign Message
            </h2>
           
            <input
                id="message"
                type="text"
                placeholder="Enter message to sign"
                style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    marginBottom: '16px',
                    outline: 'none',
                }}
            />
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: 'none',
                    borderRadius: '8px',
                    background: '#1a1a1a',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                Sign Message
            </button>
        </div>
    );
}