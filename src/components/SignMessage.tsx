"use client";

import { useState } from "react";
import { useSignMessage, useAccount } from "wagmi";

export function SignMessage() {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState("Hello from Mezo Passport!");
  const [signature, setSignature] = useState<string | null>(null);
  const { signMessage, isPending, isError } = useSignMessage({
    mutation: {
      onSuccess: (sig) => setSignature(sig),
    },
  });

  if (!isConnected) return null;

  return (
    <div className="sign-card">
      <h3 className="card-title">Sign a Message</h3>
      <div className="input-group">
        <label className="input-label">Message</label>
        <input
          className="text-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign..."
        />
      </div>
      <button
        className="action-btn"
        onClick={() => signMessage({ message })}
        disabled={isPending || !message}
      >
        {isPending ? "Signing..." : "Sign Message"}
      </button>

      {isError && <p className="error-text">Failed to sign message.</p>}

      {signature && (
        <div className="result-box">
          <p className="result-label">Signature:</p>
          <p className="result-value">{signature}</p>
        </div>
      )}
    </div>
  );
}
