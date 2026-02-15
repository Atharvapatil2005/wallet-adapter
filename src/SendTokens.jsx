import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";


export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return (
        <div className="dashboard-section" style={{ alignSelf: 'stretch' }}>
            <p className="section-title">Send SOL</p>
            <input
                id="to"
                type="text"
                placeholder="Recipient address"
                className="dashboard-input"
            />
            <input
                id="amount"
                type="text"
                placeholder="Amount (SOL)"
                className="dashboard-input"
            />
            <button onClick={sendTokens} className="btn-primary">
                Send
            </button>
        </div>
    );
}

export default SendTokens;