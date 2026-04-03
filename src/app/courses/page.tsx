"use client";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "@/lib/navBar.css";
import PaywallModal from "@/components/paywall";

export default function LessonPage() {
  return <LessonContent />;
}

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

const nextModule = { title: "Quantum Entanglement", locked: true };

function LessonContent() {
  const Router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState(1);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [unlockedLessons, setUnlockedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("unlockedLessons");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [1];
  });

  useEffect(() => {
    const stored = localStorage.getItem("unlockedLessons");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed.includes(1)) {
        parsed.push(1);
        localStorage.setItem("unlockedLessons", JSON.stringify(parsed));
      }
      setUnlockedLessons(parsed);
    } else {
      localStorage.setItem("unlockedLessons", JSON.stringify([1]));
      setUnlockedLessons([1]);
    }
  }, []);

  const isLessonLocked = (lessonId: number) => {
    const lesson = lessonOutline.find((l) => l.id === lessonId);
    return lesson?.locked && !unlockedLessons.includes(lessonId);
  };

  const handleLessonClick = (lessonId: number) => {
    if (isLessonLocked(lessonId)) {
      setShowPaywallModal(true);
    } else {
      if (lessonId === 2) {
        Router.push("/courses/lesson-2");
      } else if (lessonId === 3) {
        Router.push("/courses/lesson-3");
      } else {
        setActiveLesson(lessonId);
      }
    }
  };

  const progressPercentage = (unlockedLessons.length / lessonOutline.length) * 100;

  const lockAllContent = () => {
    localStorage.setItem("unlockedLessons", JSON.stringify([1]));
    setUnlockedLessons([1]);
  };

  return (
    <main
      style={{ minHeight: "100vh", background: "#0d0d1a", color: "#e8e8f0" }}
    >
      {/* NAV */}
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

      {/* LAYOUT */}
      <div style={{ display: "flex", paddingTop: "64px", minHeight: "100vh" }}>
        {/* SIDEBAR */}
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
          {/* Progress bar */}
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
              {unlockedLessons.length} of {lessonOutline.length} lessons unlocked
            </p>
          </div>

          {/* Lesson outline */}
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
                onClick={() => handleLessonClick(lesson.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: isLessonLocked(lesson.id) ? "not-allowed" : "pointer",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: activeLesson === lesson.id ? 600 : 400,
                  background:
                    activeLesson === lesson.id
                      ? "linear-gradient(135deg, #6c63ff, #8b5cf6)"
                      : isLessonLocked(lesson.id)
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                  color: isLessonLocked(lesson.id)
                    ? "#666688"
                    : activeLesson === lesson.id
                      ? "#fff"
                      : "#9999bb",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    opacity: isLessonLocked(lesson.id) ? 0.5 : 0.8,
                  }}
                >
                  {lesson.locked && !unlockedLessons.includes(lesson.id)
                    ? "🔒"
                    : lesson.icon}
                </span>
                {lesson.title}
              </button>
            ))}
          </div>

          {/* Next module */}
          <div style={{ marginTop: "28px" }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#7b7b9a",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              NEXT MODULE
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "8px",
                color: "#666688",
                fontSize: "13px",
              }}
            >
              <span>🔒</span>
              {nextModule.title}
            </div>
          </div>

          {/* Lock All Button */}
          <div style={{ marginTop: "28px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={lockAllContent}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.08)",
                color: "#ef4444",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              🔒 Lock All Content
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "32px 48px", maxWidth: "860px" }}>
          {/* Unlocked badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "20px",
              background: unlockedLessons.includes(activeLesson)
                ? "rgba(34, 197, 94, 0.12)"
                : "rgba(255, 165, 0, 0.12)",
              border: `1px solid ${unlockedLessons.includes(activeLesson) ? "rgba(34, 197, 94, 0.25)" : "rgba(255, 165, 0, 0.25)"}`,
              color: unlockedLessons.includes(activeLesson)
                ? "#4ade80"
                : "#ffa500",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {unlockedLessons.includes(activeLesson) ? "🔓" : "🔒"}{" "}
            {unlockedLessons.includes(activeLesson)
              ? "Unlocked via Micro Tip"
              : "Premium Content"}
          </div>

          {/* Title row */}
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
              Quantum Mechanics Basics — Lesson 1
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
            style={{ color: "#7878a0", fontSize: "13px", marginBottom: "24px" }}
          >
            Part of the Foundation Series · 12 mins read
          </p>

          {/* Video player */}
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              background: "#060614",
              marginBottom: "36px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Video area */}
            <div
              style={{
                position: "relative",
                paddingTop: "52%",
                background:
                  "radial-gradient(ellipse at center, #1a1040 0%, #060614 70%)",
                overflow: "hidden",
              }}
            >
              {/* Decorative glow lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,99,255,0.15) 0%, transparent 70%)",
                }}
              />
              {/* Play button */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(108,99,255,0.85)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    color: "#fff",
                    boxShadow: "0 0 32px rgba(108,99,255,0.5)",
                    transition: "transform 0.15s",
                  }}
                >
                  ▶
                </button>
              </div>
            </div>
            {/* Controls */}
            <div style={{ padding: "10px 16px", background: "#0a0a18" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6666aa" }}>
                  03:42 / 12:15
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "3px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      background: "#6c63ff",
                      borderRadius: "2px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "30%",
                      transform: "translate(-50%, -50%)",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      opacity: 0.6,
                    }}
                  >
                    🔊
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      opacity: 0.6,
                    }}
                  >
                    ⚙️
                  </span>
                </div>
                <span
                  style={{ fontSize: "16px", cursor: "pointer", opacity: 0.6 }}
                >
                  ⛶
                </span>
              </div>
            </div>
          </div>

          {/* Article content */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#f0f0ff",
              marginBottom: "12px",
              fontFamily: "'Georgia', serif",
            }}
          >
            The Dawn of Quantum Discovery
          </h2>
          <p
            style={{
              color: "#a0a0c0",
              lineHeight: 1.75,
              fontSize: "15px",
              marginBottom: "28px",
            }}
          >
            Quantum mechanics is the fundamental theory in physics that provides
            a description of the physical properties of nature at the scale of
            atoms and subatomic particles. It is the foundation of all quantum
            physics including quantum chemistry, quantum field theory, quantum
            technology, and quantum information science.
          </p>

          {/* Key concept card */}
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(108,99,255,0.2)",
              background: "rgba(108,99,255,0.06)",
              padding: "20px 24px",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "#a78bfa",
                  fontWeight: 700,
                  fontSize: "15px",
                  marginBottom: "8px",
                }}
              >
                Key Concept: Energy Quanta
              </p>
              <p
                style={{ color: "#9090b8", fontSize: "14px", lineHeight: 1.65 }}
              >
                Max Planck discovered that energy is not continuous, but rather
                delivered in discrete &quot;packets&quot; or quanta. This
                revolutionary idea shattered classical physics assumptions.
              </p>
            </div>
            {/* Decorative dots */}
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "60px",
                flexShrink: 0,
              }}
            >
              {[
                { x: 20, y: 10 },
                { x: 55, y: 35 },
                { x: 70, y: 8 },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: i === 1 ? "14px" : "8px",
                    height: i === 1 ? "14px" : "8px",
                    borderRadius: "50%",
                    background: i === 1 ? "#6c63ff" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#f0f0ff",
              marginBottom: "12px",
              fontFamily: "'Georgia', serif",
            }}
          >
            Historical Context
          </h2>
          <p
            style={{
              color: "#a0a0c0",
              lineHeight: 1.75,
              fontSize: "15px",
              marginBottom: "40px",
            }}
          >
            Classical physics, the collection of theories that existed before
            the advent of quantum mechanics, describes many aspects of nature at
            an ordinary (macroscopic) scale, but is not sufficient for
            describing them at small (atomic and subatomic) scales. Most
            theories in classical physics can be derived from quantum mechanics
            as an approximation valid at large (macroscopic) scale.
          </p>

          {/* Support + Next lesson */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
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
                flexShrink: 0,
              }}
            >
              💝
            </div>
            <div style={{ flex: 1, minWidth: "140px" }}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#e0e0f0",
                  marginBottom: "2px",
                }}
              >
                Support the Instructor
              </p>
              <p style={{ fontSize: "12px", color: "#7777a0" }}>
                Enjoyed this lesson? Send a micro-tip to help fund research
                content.
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {[2, 5].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTipAmount(amt)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background:
                      tipAmount === amt ? "#6c63ff" : "rgba(255,255,255,0.06)",
                    color: tipAmount === amt ? "#fff" : "#aaa",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleLessonClick(2)}
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
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(108,99,255,0.3)",
              }}
            >
              Next Lesson →
            </button>
          </div>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onSuccess={() => {
          setShowPaywallModal(false);
          Router.push("/courses/lesson-2");
        }}
        contentTitle="Wave-Particle Duality"
        lessonId={2}
        creatorAddress="0xCreatorWalletAddress123456789abcdef"
      />
    </main>
  );
}
