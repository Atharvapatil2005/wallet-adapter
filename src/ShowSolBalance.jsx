import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function fetchBalance() {
            if (!wallet.publicKey) return;

            const lamports = await connection.getBalance(wallet.publicKey);
            setBalance(lamports / LAMPORTS_PER_SOL);
        }

        fetchBalance();
    }, [wallet.publicKey, connection]);

    return (
        <div>
            <p>SOL Balance:</p>
            <div>{balance !== null ? balance : "Connect wallet to View balance"}</div>
        </div>
    );
}