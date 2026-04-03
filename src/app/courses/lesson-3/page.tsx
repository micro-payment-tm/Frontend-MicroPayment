"use client";

import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import PaywallModal from "@/components/paywall";
import NextModuleWidget from "@/components/NextModuleWidget";
import "@rainbow-me/rainbowkit/styles.css";
import "@/lib/navBar.css";

const lessonOutline = [
  { id: 1, title: "Introduction", icon: "▶", active: true, locked: false },
  {
    id: 2,
    title: "Wave-Particle Duality",
    icon: "〜",
    active: false,
    locked: true,
  },
  {
    id: 3,
    title: "Uncertainty Principle",
    icon: "⟳",
    active: false,
    locked: false,
  },
];

export default function LessonPage3() {
  const Router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [activeLesson] = useState(3);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("unlockedLessons");
      if (unlocked) {
        const parsed = JSON.parse(unlocked);
        return parsed.includes(3);
      }
    }
    return true;
  });
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const progressPercentage = (() => {
    if (typeof window !== "undefined") {
      return (JSON.parse(localStorage.getItem("unlockedLessons") || "[1]").length / lessonOutline.length) * 100;
    }
    return 100;
  })();

  return (
    <main
      style={{ minHeight: "100vh", background: "#0d0d1a", color: "#e8e8f0" }}
    >
      <nav className="nav">
        <div className="navLeft">
          <div className="logoWrap">
            <span className="logoIcon">₿</span>
            <span
              className="logoText"
              role="button"
              onClick={() => Router.back()}
            >
              Web3<span className="logoAccent">Learn</span>
            </span>
          </div>
          {["Courses", "Library", "Community", "Wallet"].map((n) => (
            <Link key={n} href={`/${n.toLowerCase()}`} className="navLink">
              {n}
            </Link>
          ))}
        </div>
        <div className="navRight">
          <div className="searchBox">
            <span style={{ opacity: 0.45, fontSize: 13 }}>🔍</span>
            <span style={{ opacity: 0.35, fontSize: 13 }}>Search lessons…</span>
          </div>
          <div className="connectWrap">
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="address"
            />
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "64px", minHeight: "100vh" }}>
        <aside
          style={{
            width: "220px",
            minWidth: "220px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "28px 16px",
            position: "sticky",
            top: "64px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#7b7b9a",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              COURSE PROGRESS
            </p>
            <div
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #6c63ff, #a78bfa)",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p style={{ fontSize: "11px", color: "#7b7b9a" }}>
              {
                JSON.parse(localStorage.getItem("unlockedLessons") || "[1]")
                  .length
              }{" "}
              of {lessonOutline.length} lessons unlocked
            </p>
          </div>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "12px",
              color: "#e8e8f0",
            }}
          >
            Lesson Outline
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {lessonOutline.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  if (lesson.id === 1) Router.push("/courses");
                  if (lesson.id === 2) Router.push("/courses/lesson-2");
                  if (lesson.id === 3) Router.push("/courses/lesson-3");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: activeLesson === lesson.id ? 600 : 400,
                  background:
                    activeLesson === lesson.id
                      ? "linear-gradient(135deg, #6c63ff, #8b5cf6)"
                      : "transparent",
                  color: activeLesson === lesson.id ? "#fff" : "#9999bb",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "12px", opacity: 0.8 }}>
                  {lesson.icon}
                </span>
                {lesson.title}
              </button>
            ))}
          </div>
        </aside>

        <div
          style={{
            flex: 1,
            padding: "32px 48px",
            maxWidth: "860px",
            position: "relative",
          }}
        >
          {isUnlocked ? (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                  color: "#4ade80",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                🔓 Unlocked via Micro Tip
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  gap: "16px",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 800,
                    color: "#f0f0ff",
                    lineHeight: 1.2,
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Uncertainty Principle — Lesson 3
                </h1>
                <button
                  onClick={() => setCompleted(!completed)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: completed
                      ? "1px solid rgba(34,197,94,0.4)"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: completed
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(255,255,255,0.05)",
                    color: completed ? "#4ade80" : "#aaa",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {completed ? "✓" : "○"} Mark Complete
                </button>
              </div>

              <p
                style={{
                  color: "#7878a0",
                  fontSize: "13px",
                  marginBottom: "32px",
                }}
              >
                Part of the Foundation Series · 18 mins read
              </p>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                The Fundamental Limit of Knowledge
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                The Heisenberg Uncertainty Principle is one of the most famous and counterintuitive results in quantum mechanics. It states that certain pairs of physical properties, like position and momentum, cannot both be known to arbitrary precision at the same time. This is not a limitation of our measurement instruments—it is a fundamental feature of nature itself.
              </p>

              <div
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(108,99,255,0.2)",
                  background: "rgba(108,99,255,0.06)",
                  padding: "20px 24px",
                  marginBottom: "32px",
                }}
              >
                <p
                  style={{
                    color: "#a78bfa",
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "8px",
                  }}
                >
                  Key Concept: The Uncertainty Principle
                </p>
                <p
                  style={{
                    color: "#9090b8",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  The product of the uncertainties in position (Δx) and momentum (Δp) must be greater than or equal to ħ/2, where ħ is the reduced Planck constant. This means the more precisely you know one quantity, the less precisely you can know the other.
                </p>
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Mathematical Formulation
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                The uncertainty principle can be written as Δx · Δp ≥ ħ/2. This mathematical relationship reveals that the product of the uncertainties in position and momentum can never be smaller than a fundamental constant. While this constant is extremely small in everyday scales, it becomes significant at the atomic and subatomic levels.
              </p>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Implications for Reality
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                The uncertainty principle has profound implications for our understanding of reality. It means that at the quantum level, particles do not have well-defined positions and velocities simultaneously. Instead, they exist in probability distributions, described by wave functions. This fundamental fuzziness is what gives quantum mechanics its characteristic probabilistic nature.
              </p>

              <div
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(251,191,36,0.2)",
                  background: "rgba(251,191,36,0.06)",
                  padding: "20px 24px",
                  marginBottom: "32px",
                }}
              >
                <p
                  style={{
                    color: "#fbbf24",
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "8px",
                  }}
                >
                  Key Concept: Wave Functions
                </p>
                <p
                  style={{
                    color: "#9090b8",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  Quantum particles are described by wave functions that encode all the probabilistic information about their properties. The square of the wave function gives the probability density of finding the particle at a particular location.
                </p>
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Common Misconceptions
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                A common misunderstanding is that the uncertainty principle is about measurement disturbance—that observing a particle inevitably disturbs its motion. While this is true in practice, the principle is fundamentally different: it states that the quantities simply cannot have precise values simultaneously, regardless of how we measure them.
              </p>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "16px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Applications
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "40px",
                }}
              >
                The uncertainty principle has practical implications in various technologies. It sets a fundamental limit on the precision of GPS systems due to timing uncertainties. In semiconductor physics, it explains the behavior of electrons in materials. It also underlies the operation of scanning tunneling microscopes, which can image individual atoms.
              </p>

              <div
                style={{
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "rgba(108,99,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    💝
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#e0e0f0",
                        marginBottom: "2px",
                      }}
                    >
                      Congratulations on completing the course!
                    </p>
                    <p style={{ fontSize: "12px", color: "#7777a0" }}>
                      You've finished all available lessons. More coming soon.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => Router.push("/courses")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "11px 22px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(108,99,255,0.3)",
                  }}
                >
                  ← Back to Course
                </button>
              </div>

              <NextModuleWidget
                title="Quantum Entanglement"
                locked={true}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  background: "rgba(255, 165, 0, 0.12)",
                  border: "1px solid rgba(255, 165, 0, 0.25)",
                  color: "#ffa500",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                🔒 Premium Content
              </div>

              <h1
                style={{
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 800,
                  color: "#f0f0ff",
                  lineHeight: 1.2,
                  margin: 0,
                  fontFamily: "'Georgia', serif",
                  marginBottom: "8px",
                }}
              >
                Uncertainty Principle — Lesson 3
              </h1>
              <p
                style={{
                  color: "#7878a0",
                  fontSize: "13px",
                  marginBottom: "32px",
                }}
              >
                Part of the Foundation Series · 18 mins read
              </p>

              <div
                style={{
                  filter: "blur(8px)",
                  pointerEvents: "none",
                  userSelect: "none",
                  opacity: 0.5,
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#f0f0ff",
                    marginBottom: "16px",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  The Fundamental Limit of Knowledge
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "24px",
                  }}
                >
                  The Heisenberg Uncertainty Principle is one of the most famous and counterintuitive results in quantum mechanics...
                </p>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => setShowPaywallModal(true)}
                  style={{
                    padding: "16px 32px",
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 32px rgba(108,99,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  🔐 Unlock This Lesson
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onSuccess={() => {
          window.location.reload();
        }}
        contentTitle="Uncertainty Principle"
        lessonId={3}
      />
    </main>
  );
}
