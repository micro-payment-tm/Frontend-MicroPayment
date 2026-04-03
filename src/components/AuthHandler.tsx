"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { getNonce, login, getAuthToken } from "@/repostiory/auth";

export function AuthHandler({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const hasTriedAuth = useRef(false);

  // check token on first load
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isConnected || !address) return;
    if (hasTriedAuth.current) return;

    const authenticate = async () => {
      setIsAuthenticating(true);
      hasTriedAuth.current = true;

      try {
        // 1️⃣ get nonce
        const nonceResult = await getNonce(address);

        if (!nonceResult.success || !nonceResult.nonce) {
          console.error("Failed get nonce");
          setIsAuthenticating(false);
          return;
        }

        const message = `Sign this message to login.\n\nNonce: ${nonceResult.nonce}`;

        // 2️⃣ sign message
        const signature = await new Promise<string>((resolve, reject) => {
          signMessage(
            { message },
            {
              onSuccess: (sig: string) => resolve(sig),
              onError: (err: Error) => reject(err),
            }
          );
        });

        // 3️⃣ login
        const loginResult = await login({
          address,
          signature,
          nonce: nonceResult.nonce,
        });

        if (!loginResult.success) {
          console.error("Login failed");
          disconnect();
          setIsAuthenticating(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth error", err);
        disconnect();
      }

      setIsAuthenticating(false);
    };

    authenticate();
  }, [isConnected, address, signMessage, disconnect]);

  // if (isAuthenticating) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>Authenticating wallet...</p>
  //     </div>
  //   );
  // }

  if (!isConnected) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please sign the message to continue</p>
      </div>
    );
  }

  return <>{children}</>;
}
