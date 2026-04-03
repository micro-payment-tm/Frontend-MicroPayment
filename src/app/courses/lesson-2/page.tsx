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

export default function LessonPage2() {
  const Router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [activeLesson] = useState(2);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("unlockedLessons");
      if (unlocked) {
        const parsed = JSON.parse(unlocked);
        return parsed.includes(2);
      }
    }
    return false;
  });
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const progressPercentage = (() => {
    if (typeof window !== "undefined") {
      return (
        (JSON.parse(localStorage.getItem("unlockedLessons") || "[1]").length /
          lessonOutline.length) *
        100
      );
    }
    return 66.67;
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
                  Wave-Particle Duality — Lesson 2
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
                Part of the Foundation Series · 15 mins read
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
                The Dual Nature of Light and Matter
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                One of the most profound discoveries in physics is that
                particles of matter and packets of light behave as both waves
                and particles, depending on how we observe them. This
                phenomenon, known as wave-particle duality, challenges our
                classical intuition and forms a cornerstone of quantum
                mechanics.
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
                  Key Concept: Wave-Particle Duality
                </p>
                <p
                  style={{
                    color: "#9090b8",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  Light can behave as both a wave and a particle. This was first
                  demonstrated by the double-slit experiment, which showed
                  interference patterns (wave behavior) even when light was
                  emitted one photon at a time (particle behavior).
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
                The Photoelectric Effect
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                Einstein explained the photoelectric effect by proposing that
                light consists of discrete quanta called photons. Each photon
                carries energy proportional to its frequency. When a photon
                strikes a metal, it can eject an electron if its energy exceeds
                the metal&apos;s work function. This particle-like behavior of
                light earned Einstein his Nobel Prize.
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
                de Broglie&apos;s Hypothesis
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                Louis de Broglie proposed that if light (a wave) can behave as
                particles, then matter (particles) should also exhibit wave-like
                properties. The wavelength of a particle is given by λ = h/p,
                where h is Planck&apos;s constant and p is the momentum. This
                revolutionary idea was later confirmed by electron diffraction
                experiments.
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
                  Key Concept: de Broglie Wavelength
                </p>
                <p
                  style={{
                    color: "#9090b8",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  All objects have a quantum wavelength, but for everyday
                  objects, this wavelength is immeasurably small. Only at atomic
                  and subatomic scales do wave properties become significant.
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
                The Double-Slit Experiment
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                The double-slit experiment is perhaps the most famous
                demonstration of wave-particle duality. When electrons are fired
                one at a time through two slits, an interference pattern builds
                up over time, suggesting wave-like behavior. However, when we
                try to detect which slit each electron passes through, the
                interference pattern disappears, and the electrons behave like
                particles.
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
                Implications and Applications
              </h2>

              <p
                style={{
                  color: "#a0a0c0",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "40px",
                }}
              >
                Wave-particle duality has profound implications for our
                understanding of nature. It forms the basis for modern
                technologies like electron microscopes, which use the wave
                nature of electrons to achieve much higher resolution than
                optical microscopes. It also underlies the working principle of
                LEDs, solar cells, and quantum computers.
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
                      Enjoyed this lesson?
                    </p>
                    <p style={{ fontSize: "12px", color: "#7777a0" }}>
                      Continue to the next lesson to learn more about quantum
                      mechanics.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => Router.back()}
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
                title="Uncertainty Principle"
                locked={false}
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
                Wave-Particle Duality — Lesson 2
              </h1>
              <p
                style={{
                  color: "#7878a0",
                  fontSize: "13px",
                  marginBottom: "32px",
                }}
              >
                Part of the Foundation Series · 15 mins read
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
                  The Dual Nature of Light and Matter
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "24px",
                  }}
                >
                  One of the most profound discoveries in physics is that
                  particles of matter and packets of light behave as both waves
                  and particles, depending on how we observe them. This
                  phenomenon, known as wave-particle duality, challenges our
                  classical intuition and forms a cornerstone of quantum
                  mechanics.
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
                    Key Concept: Wave-Particle Duality
                  </p>
                  <p
                    style={{
                      color: "#9090b8",
                      fontSize: "14px",
                      lineHeight: 1.65,
                    }}
                  >
                    Light can behave as both a wave and a particle. This was
                    first demonstrated by the double-slit experiment.
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
                  The Photoelectric Effect
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "24px",
                  }}
                >
                  Einstein explained the photoelectric effect by proposing that
                  light consists of discrete quanta called photons...
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
                  de Broglie&apos;s Hypothesis
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "24px",
                  }}
                >
                  Louis de Broglie proposed that if light can behave as
                  particles, then matter should also exhibit wave-like
                  properties...
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
                  The Double-Slit Experiment
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "24px",
                  }}
                >
                  The double-slit experiment is perhaps the most famous
                  demonstration of wave-particle duality...
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
                  Implications and Applications
                </h2>

                <p
                  style={{
                    color: "#a0a0c0",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    marginBottom: "40px",
                  }}
                >
                  Wave-particle duality has profound implications for our
                  understanding of nature...
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
        contentTitle="Wave-Particle Duality"
        lessonId={2}
      />

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
