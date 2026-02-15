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
        <div>
            <input
                type="text"
                placeholder="Amount in SOL"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button
                onClick={sendAirdropToUser}
                disabled={isSending}
            >
                {isSending ? "Sending..." : "Airdrop to Wallet"}
            </button>
        </div>
    );
}