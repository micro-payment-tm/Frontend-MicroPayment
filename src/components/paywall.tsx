"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import { sendPayment } from "@/repostiory/sendPayment";
import QRCodeLib from "qrcode";

const CREATOR_WALLET_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contentTitle: string;
  lessonId?: number;
  creatorAddress?: string;
}

export default function PaywallModal({
  isOpen,
  onClose,
  onSuccess,
  contentTitle,
  lessonId,
  creatorAddress = "0xD7cA1254d669bed370d375d49d9e7c5750aF8Fc8",
}: PaywallModalProps) {
  const [visible, setVisible] = useState(isOpen);
  const [selectedToken, setSelectedToken] = useState("MEZO");
  const [tipAmount, setTipAmount] = useState("0.0001");
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const { address, isConnected, connector } = useAccount();
  const { data: balance } = useBalance({ address });
  // NEW: separate state untuk tampilkan success overlay
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const generateQR = async () => {
      const amountInWei = BigInt(Math.floor(parseFloat(tipAmount || "0.0001") * 1e18)).toString();
      const paymentUri = `ethereum:${creatorAddress}?value=${amountInWei}`;
      try {
        const dataUrl = await QRCodeLib.toDataURL(paymentUri, {
          width: 120,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error("QR generation error:", err);
        setQrCodeDataUrl("");
      }
    };
    generateQR();
  }, [creatorAddress, tipAmount]);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const balanceCardRef = useRef<HTMLDivElement>(null);
  const tokenSectionRef = useRef<HTMLDivElement>(null);
  const qrSectionRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const footerTextRef = useRef<HTMLParagraphElement>(null);
  const lockIconRef = useRef<HTMLSpanElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);

  const tokens = [
    { id: "MUEDD", label: "MUEDD", icon: "$", color: "#6c63ff" },
    { id: "MEZO", label: "MEZO", icon: "◎", color: "#9b8cff" },
    { id: "BTC", label: "Native BTC", icon: "₿", color: "#9b8cff" },
  ];

  // Entrance animation
  useEffect(() => {
    if (!visible) return;

    animate(backdropRef.current!, {
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });

    animate(modalRef.current!, {
      opacity: [0, 1],
      scale: [0.88, 1],
      translateY: [40, 0],
      duration: 500,
      delay: 100,
      easing: "easeOutExpo",
    });

    animate(
      [
        headerRef.current,
        balanceCardRef.current,
        tokenSectionRef.current,
        qrSectionRef.current,
        ctaBtnRef.current,
        footerTextRef.current,
      ],
      {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(80, { start: 350 }),
        duration: 400,
        easing: "easeOutQuad",
      },
    );

    animate(lockIconRef.current!, {
      rotate: [-8, 8, -5, 5, 0],
      duration: 600,
      delay: 900,
      easing: "easeInOutSine",
    });
  }, [visible]);

  // Success card entrance animation
  useEffect(() => {
    if (!showSuccess || !successCardRef.current) return;

    animate(successCardRef.current, {
      opacity: [0, 1],
      scale: [0.75, 1],
      duration: 500,
      easing: "easeOutBack",
    });

    animate(".success-check", {
      scale: [0, 1.3, 1],
      rotate: ["-30deg", "0deg"],
      duration: 600,
      delay: 200,
      easing: "easeOutElastic(1, 0.5)",
    });

    animate(".success-text", {
      opacity: [0, 1],
      translateY: [12, 0],
      delay: stagger(80, { start: 400 }),
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [showSuccess]);

  const handleTokenSelect = (tokenId: string) => {
    setSelectedToken(tokenId);
    const btn = document.querySelector(`[data-token="${tokenId}"]`);
    if (btn) {
      animate(btn, {
        scale: [1, 1.1, 0.97, 1],
        duration: 350,
        easing: "easeInOutBack",
      });
    }
  };

  const addTip = (val: number) => {
    setTipAmount((prev) => (parseFloat(prev || "0") + val).toFixed(2));
    const inputBox = document.querySelector(".tip-input-box");
    if (inputBox) {
      animate(inputBox, {
        borderColor: ["rgba(108,99,255,0.8)", "rgba(108,99,255,0.2)"],
        scale: [1, 1.03, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  const handlePay = async () => {
    animate(ctaBtnRef.current!, {
      scale: [1, 0.96, 1],
      duration: 200,
      easing: "easeInOutQuad",
    });

    setIsProcessing(true);
    setPaymentError("");

    const paymentAmount = tipAmount || "0.0001";

    const result = await sendPayment({
      to: creatorAddress,
      amount: paymentAmount,
    });

    setIsProcessing(false);

    if (!result.success) {
      setPaymentError(result.message || "Payment failed");
      return;
    }

    setUnlocked(true);

    // Save unlocked lesson
    if (lessonId) {
      const stored = localStorage.getItem("unlockedLessons");
      let unlockedLessons: number[] = [];
      if (stored) unlockedLessons = JSON.parse(stored);
      if (!unlockedLessons.includes(lessonId)) {
        unlockedLessons.push(lessonId);
        localStorage.setItem(
          "unlockedLessons",
          JSON.stringify(unlockedLessons),
        );
      }
    }

    animate(ctaBtnRef.current!, {
      scale: [1, 1.05, 0.98, 1],
      duration: 500,
      easing: "easeOutElastic(1, 0.5)",
    });

    animate(modalRef.current!, {
      boxShadow: [
        "0 24px 80px rgba(0,0,0,0.7)",
        "0 0 60px rgba(34,197,94,0.4), 0 24px 80px rgba(0,0,0,0.7)",
        "0 24px 80px rgba(0,0,0,0.7)",
      ],
      duration: 800,
      easing: "easeInOutSine",
    });

    // FIXED: Fade out modal card, lalu tampilkan success SEBAGAI OVERLAY (bukan halaman baru)
    setTimeout(() => {
      animate(modalRef.current!, {
        opacity: [1, 0],
        scale: [1, 0.92],
        translateY: [0, -20],
        duration: 400,
        easing: "easeInExpo",
        complete: () => {
          // Sembunyikan konten modal, tampilkan success card (masih dalam overlay yang sama)
          setShowSuccess(true);
          // Panggil onSuccess callback setelah animasi
          setTimeout(() => onSuccess(), 1800);
        },
      });
    }, 1500);
  };

  const handleCloseHover = () => {
    const btn = document.querySelector(".close-btn") as HTMLElement | null;
    if (!btn) return;
    animate(btn, { rotate: [0, 90], duration: 250, easing: "easeOutQuad" });
  };

  const handleCloseLeave = () => {
    const btn = document.querySelector(".close-btn") as HTMLElement | null;
    if (!btn) return;
    animate(btn, { rotate: [90, 0], duration: 250, easing: "easeOutQuad" });
  };

  // Kalau modal tidak perlu ditampilkan sama sekali
  if (!visible && !showSuccess) return null;

  return (
    <>
      {/* OVERLAY — selalu fixed di atas halaman */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,8,18,0.85)",
            backdropFilter: "blur(3px)",
            opacity: showSuccess ? 1 : 0,
          }}
        />

        {/* ─── SUCCESS CARD (overlay, bukan halaman baru) ─── */}
        {showSuccess && (
          <div
            ref={successCardRef}
            style={{
              position: "relative",
              zIndex: 10,
              width: 320,
              background: "linear-gradient(160deg, #131326 0%, #0f0f22 100%)",
              borderRadius: 18,
              border: "1px solid rgba(34,197,94,0.3)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(34,197,94,0.15)",
              padding: "40px 32px",
              textAlign: "center",
              opacity: 0,
            }}
          >
            <div
              className="success-check"
              style={{
                fontSize: 56,
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.12)",
                border: "2px solid rgba(34,197,94,0.3)",
                transformOrigin: "center",
              }}
            >
              ✓
            </div>
            <p
              className="success-text"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#4ade80",
                margin: "0 0 8px",
                opacity: 0,
              }}
            >
              Course Unlocked!
            </p>
            <p
              className="success-text"
              style={{
                fontSize: 13,
                color: "#5a5a7a",
                margin: "0 0 24px",
                opacity: 0,
              }}
            >
              Enjoy your premium content
            </p>
            <button
              className="success-text"
              onClick={() => {
                setVisible(false);
                setShowSuccess(false);
                onClose();
              }}
              style={{
                padding: "10px 28px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                opacity: 0,
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {/* ─── MODAL UTAMA ─── */}
        {!showSuccess && (
          <div
            ref={modalRef}
            style={{
              position: "relative",
              zIndex: 10,
              width: 420,
              maxWidth: "95vw",
              background: "linear-gradient(160deg, #131326 0%, #0f0f22 100%)",
              borderRadius: 18,
              border: "1px solid rgba(108,99,255,0.2)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            {/* Header */}
            <div
              ref={headerRef}
              style={{ padding: "26px 28px 20px", opacity: 0 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#f0f0ff",
                      fontSize: 20,
                      fontWeight: 700,
                      margin: "0 0 6px",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    <span
                      ref={lockIconRef}
                      style={{ display: "inline-block", marginRight: 6 }}
                    >
                      🔒
                    </span>
                    Unlock Premium Course
                  </h2>
                  <p style={{ color: "#6b6b8f", fontSize: 13, margin: 0 }}>
                    Pay With Minimal 0.00000005 BTC to access {contentTitle}
                  </p>
                </div>
                <button
                  className="close-btn"
                  onClick={() => {
                    setVisible(false);
                    onClose();
                  }}
                  onMouseEnter={handleCloseHover}
                  onMouseLeave={handleCloseLeave}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#888",
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transformOrigin: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              style={{
                padding: "0 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Balance Card */}
              <div
                ref={balanceCardRef}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: "rgba(108,99,255,0.15)",
                      border: "1px solid rgba(108,99,255,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    💳
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#5a5a7a",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        margin: "0 0 3px",
                        textTransform: "uppercase",
                      }}
                    >
                      Your Balance
                    </p>
                    <p
                      style={{
                        color: "#e8e8f0",
                        fontSize: 18,
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {balance
                        ? parseFloat(balance.formatted).toFixed(6)
                        : "0.000000"}{" "}
                      {balance?.symbol || "ETH"}{" "}
                      <span style={{ color: "#a78bfa" }}></span>
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    color: "#4ade80",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Active
                </span>
              </div>

              {/* Token Selector */}
              <div ref={tokenSectionRef} style={{ opacity: 0 }}>
                <p
                  style={{
                    color: "#6b6b8f",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    margin: "0 0 10px",
                    textTransform: "uppercase",
                  }}
                >
                  Select Payment Asset
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                  }}
                >
                  {tokens.map((t) => (
                    <button
                      key={t.id}
                      data-token={t.id}
                      onClick={() => handleTokenSelect(t.id)}
                      style={{
                        padding: "14px 8px",
                        borderRadius: 10,
                        border:
                          selectedToken === t.id
                            ? "1.5px solid #6c63ff"
                            : "1px solid rgba(255,255,255,0.07)",
                        background:
                          selectedToken === t.id
                            ? "rgba(108,99,255,0.12)"
                            : "rgba(255,255,255,0.03)",
                        color: selectedToken === t.id ? "#e8e8f0" : "#7070a0",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        transition:
                          "border 0.15s, background 0.15s, color 0.15s",
                        transformOrigin: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          color: selectedToken === t.id ? "#a78bfa" : "#666688",
                        }}
                      >
                        {t.icon}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR + Tip Section */}
              <div
                ref={qrSectionRef}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      padding: 8,
                      width: 96,
                      height: 96,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {qrCodeDataUrl ? (
                      <img
                        src={qrCodeDataUrl}
                        alt="Payment QR Code"
                        style={{
                          width: 80,
                          height: 80,
                          imageRendering: "pixelated",
                        }}
                      />
                    ) : (
                      <div
                        style={{ width: 80, height: 80, background: "#f0f0f0" }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      color: "#5a5a7a",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    📷 Scan to Pay
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "#e8e8f0",
                      fontSize: 13,
                      fontWeight: 600,
                      margin: "0 0 10px",
                    }}
                  >
                    Support the Creator (Tip)
                  </p>
                  <div
                    className="tip-input-box"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(108,99,255,0.2)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 10px",
                      marginBottom: 10,
                      transformOrigin: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        color: "#e8e8f0",
                        fontSize: 18,
                        fontWeight: 600,
                        fontFamily: "'DM Mono', monospace",
                        outline: "none",
                        padding: "8px 0",
                        width: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "#a78bfa",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {selectedToken}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1, 5, 10].map((v) => (
                      <button
                        key={v}
                        onClick={() => addTip(v)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: 6,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                          color: "#9090b8",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        +{v}.00
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                ref={ctaBtnRef}
                onClick={handlePay}
                disabled={isProcessing || unlocked}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: 12,
                  border: "none",
                  background: unlocked
                    ? "rgba(34,197,94,0.8)"
                    : "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 6px 24px rgba(108,99,255,0.35)",
                  transition: "background 0.3s",
                  letterSpacing: "-0.2px",
                  transformOrigin: "center",
                  opacity: 0,
                }}
              >
                {unlocked ? (
                  <>✓ Unlocked!</>
                ) : isProcessing ? (
                  <>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Processing...
                  </>
                ) : (
                  <>🔒 Send Tip & Unlock Course</>
                )}
              </button>

              {/* Payment Error */}
              {paymentError && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#ef4444",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {paymentError}
                </div>
              )}

              {/* Creator Wallet Address */}
              <div
                style={{
                  padding: "12px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#6b6b8f",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    margin: "0 0 6px",
                    textTransform: "uppercase",
                  }}
                >
                  Send {tipAmount || "0.0001"} ETH to
                </p>
                <p
                  style={{
                    color: "#a78bfa",
                    fontSize: 11,
                    fontFamily: "'DM Mono', monospace",
                    wordBreak: "break-all",
                    margin: 0,
                  }}
                >
                  {creatorAddress.slice(0, 10)}...{creatorAddress.slice(-8)}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(creatorAddress)}
                  style={{
                    marginTop: 6,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "#6b6b8f",
                    fontSize: 10,
                    cursor: "pointer",
                  }}
                >
                  Copy Address
                </button>
              </div>

              {/* Payment Amount Info */}
              <div
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  background: "rgba(108,99,255,0.1)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#a78bfa", fontSize: 12, margin: 0, fontWeight: 600 }}>
                  Amount: {tipAmount || "0.0001"} ETH
                </p>
                <p style={{ color: "#6b6b8f", fontSize: 10, margin: "4px 0 0" }}>
                  Network: Mezo Testnet (31611)
                </p>
              </div>

              <p
                ref={footerTextRef}
                style={{
                  color: "#4a4a6a",
                  fontSize: 11,
                  textAlign: "center",
                  margin: 0,
                  opacity: 0,
                }}
              >
                🔐 Secure Web3 Transaction via Mezo Network
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover { opacity: 0.9; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>
    </>
  );
}
