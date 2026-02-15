import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [isSending, setIsSending] = useState(false);
    const [amount, setAmount] = useState("");

    async function sendAirdropToUser() {
        if (isSending) return;

        if (!wallet.publicKey) {
            alert("Connect wallet first");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            setIsSending(true);

            const lamports = Number(amount) * LAMPORTS_PER_SOL;

            const sig = await connection.requestAirdrop(
                wallet.publicKey,
                lamports
            );

            await connection.confirmTransaction(sig, "confirmed");

            alert(`Airdropped ${amount} SOL`);
        } catch (err) {
            console.error(err);
            alert("Airdrop failed");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="dashboard-section" style={{ alignSelf: 'stretch' }}>
            <p className="section-title">Airdrop (devnet)</p>
            <input
                type="text"
                placeholder="Amount in SOL"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="dashboard-input"
            />
            <button
                onClick={sendAirdropToUser}
                disabled={isSending}
                className="btn-primary"
            >
                {isSending ? "Sending…" : "Airdrop to Wallet"}
            </button>
        </div>
    );
}