import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isSending, setIsSending] = useState(false);

    async function sendAirdropToUser() {
        if (isSending) return;

        if (!wallet.publicKey) {
            alert("Connect wallet first");
            return;
        }

        try {
            setIsSending(true);
            await connection.requestAirdrop(
                wallet.publicKey,
                1_000_000_000
            );
            alert("Airdropped 1 SOL");
        } catch (err) {
            console.error(err);
            alert("Airdrop failed");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div>
            <input type="text" placeholder="Amount" />
            <button
                onClick={sendAirdropToUser}
                disabled={isSending}
            >
                {isSending ? "Sending..." : "Send Airdrop"}
            </button>
        </div>
    );
}