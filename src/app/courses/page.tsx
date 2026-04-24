"use client";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "@/lib/navBar.css";
import PaywallModal from "@/components/paywall";

type ContentType = "video" | "module" | "article";

type CourseContentItem = {
  id: number;
  type: ContentType;
  title: string;
  price: string;
  source?: string;
  isFree?: boolean;
  body?: string;
  highlightTitle?: string;
  highlightBody?: string;
};

type DiscussionComment = {
  id: number;
  contentId: number;
  author: string;
  role: "user" | "creator";
  message: string;
  createdAt: string;
  parentId: number | null;
};

type CourseData = {
  id: number;
  title: string;
  fullPrice: string;
  contents: CourseContentItem[];
};

type AccessRecord =
  | {
      scope: "content";
      contentId: number;
    }
  | {
      scope: "course";
      courseId: number;
      access: "full";
    };

export default function LessonPage() {
  return <LessonContent />;
}

const courseData: CourseData = {
  id: 1,
  title: "Quantum Mechanics Basics",
  fullPrice: "2.00",
  contents: [
    {
      id: 101,
      type: "video",
      title: "Introduction to Quantum Mechanics",
      price: "Free",
      source: "146v_deL2E-x1vZME-3qW0zYMReoZovf_",
      isFree: true,
    },
    {
      id: 102,
      type: "video",
      title: "Wave-Particle Duality",
      price: "0.35",
      source: "1Fg8X_xb9ifocAacIU-xY1K5CJUvXxBet",
      isFree: false,
    },
    {
      id: 103,
      type: "video",
      title: "Schrödinger's Equation",
      price: "0.25",
      source: "ID LINK GDRIVE",
      isFree: false,
    },
    {
      id: 201,
      type: "module",
      title: "Quantum Mechanics Module PDF",
      price: "Free",
      source:
        "https://drive.google.com/file/d/1exKF6lLK963Dy7KBuqDoFRrVijp4YNOn/preview",
      isFree: true,
    },
    {
      id: 301,
      type: "article",
      title: "The Dawn of Quantum Discovery",
      price: "Free",
      isFree: true,
      body: "Quantum mechanics is the fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
      highlightTitle: "Key Concept: Energy Quanta",
      highlightBody:
        "Max Planck discovered that energy is not continuous, but rather delivered in discrete 'packets' or quanta. This revolutionary idea shattered classical physics assumptions.",
    },
    {
      id: 302,
      type: "article",
      title: "Historical Context",
      price: "0.001",
      isFree: false,
      body: "Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary (macroscopic) scale, but is not sufficient for describing them at small (atomic and subatomic) scales. Most theories in classical physics can be derived from quantum mechanics as an approximation valid at large (macroscopic) scale.",
    },
  ],
};

const initialComments: DiscussionComment[] = [
  {
    id: 1,
    contentId: 101,
    author: "Alya",
    role: "user",
    message:
      "Saya masih bingung perbedaan konsep kuanta dengan energi klasik. Bisa dijelaskan lebih sederhana?",
    createdAt: "2 jam lalu",
    parentId: null,
  },
  {
    id: 2,
    contentId: 101,
    author: "Dr. Creator",
    role: "creator",
    message:
      "Tentu. Secara sederhana, energi klasik dianggap kontinu, sedangkan pada konsep kuanta energi hadir dalam paket diskrit.",
    createdAt: "1 jam lalu",
    parentId: 1,
  },
  {
    id: 3,
    contentId: 201,
    author: "Bima",
    role: "user",
    message:
      "Modulnya bagus, tetapi mungkin bisa ditambahkan contoh soal di bagian akhir.",
    createdAt: "30 menit lalu",
    parentId: null,
  },
];

const COMPLETED_STORAGE_KEY = "completedContents";

export function getCompletedCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(COMPLETED_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as number[]).length : 0;
  } catch {
    return 0;
  }
}

function LessonContent() {
  const Router = useRouter();
  const [activeContentId, setActiveContentId] = useState<number>(
    courseData.contents[0].id,
  );
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_STORAGE_KEY);
      const list = stored ? JSON.parse(stored) : [];
      setCompletedList(list);
      setCompleted(list.includes(activeContentId));
    } catch {
      setCompletedList([]);
    }
  }, [activeContentId]);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [isTipHovered, setIsTipHovered] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [comments, setComments] =
    useState<DiscussionComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [accessList, setAccessList] = useState<AccessRecord[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("accessList");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const hasContentAccess = (contentId: number, courseId: number) => {
    const contentItem = courseData.contents.find(
      (item) => item.id === contentId,
    );

    if (contentItem?.isFree) return true;

    return accessList.some(
      (item) =>
        (item.scope === "content" && item.contentId === contentId) ||
        (item.scope === "course" &&
          item.courseId === courseId &&
          item.access === "full"),
    );
  };

  const hasFullCourseAccess = (courseId: number) => {
    return accessList.some(
      (item) =>
        item.scope === "course" &&
        item.courseId === courseId &&
        item.access === "full",
    );
  };

  const activeContent =
    courseData.contents.find((item) => item.id === activeContentId) ||
    courseData.contents[0];

  const [selectedContent, setSelectedContent] =
    useState<CourseContentItem | null>(null);
  const [paywallMode, setPaywallMode] = useState<"content" | "course" | "tip">(
    "content",
  );

  const openContentPaywall = (content: CourseContentItem) => {
    setSelectedContent(content);
    setPaywallMode("content");
    setShowPaywallModal(true);
  };

  const openTipModal = () => {
    setSelectedContent(null);
    setPaywallMode("tip");
    setShowPaywallModal(true);
  };

  const openFullCoursePaywall = () => {
    setSelectedContent(null);
    setPaywallMode("course");
    setShowPaywallModal(true);
  };

  const unlockedCount = courseData.contents.filter((content) =>
    hasContentAccess(content.id, courseData.id),
  ).length;

  const progressPercentage = (unlockedCount / courseData.contents.length) * 100;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <main
        style={{ minHeight: "100vh", background: "#0d0d1a", color: "#e8e8f0" }}
      >
        <div style={{ padding: "40px" }}>Loading course...</div>
      </main>
    );
  }

  const activeComments = comments.filter(
    (comment) => comment.contentId === activeContent.id,
  );
  const rootComments = activeComments.filter((comment) => !comment.parentId);
  const getReplies = (commentId: number) =>
    activeComments.filter((comment) => comment.parentId === commentId);
  const getRootParentId = (commentId: number): number => {
    const current = activeComments.find((c) => c.id === commentId);
    if (!current || !current.parentId) return commentId;
    let parent = activeComments.find((c) => c.id === current.parentId);
    while (parent && parent.parentId) {
      parent = activeComments.find((c) => c.id === parent?.parentId);
    }
    return parent ? parent.id : commentId;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const finalParentId = replyTo === null ? null : getRootParentId(replyTo);

    const comment: DiscussionComment = {
      id: Date.now(),
      contentId: activeContent.id,
      author: "You",
      role: "user",
      message: newComment.trim(),
      createdAt: "Baru saja",
      parentId: finalParentId,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
    setReplyTo(null);
  };

  const renderCommentThread = (comment: DiscussionComment) => {
    const replies = getReplies(comment.id);

    return (
      <div
        key={comment.id}
        style={{
          padding: "14px 16px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "8px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <strong style={{ color: "#f0f0ff" }}>{comment.author}</strong>
            <span
              style={{
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "999px",
                background:
                  comment.role === "creator"
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(108,99,255,0.12)",
                color: comment.role === "creator" ? "#4ade80" : "#a78bfa",
              }}
            >
              {comment.role === "creator" ? "Creator" : "User"}
            </span>
          </div>
          <span style={{ fontSize: "12px", color: "#8d8db2" }}>
            {comment.createdAt}
          </span>
        </div>

        <p style={{ margin: "0 0 10px", color: "#cfcfe8", lineHeight: 1.7 }}>
          {comment.message}
        </p>

        <button
          onClick={() => setReplyTo(comment.id)}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#b8b8d8",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Reply
        </button>

        {replies.length > 0 && (
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingLeft: "14px",
              borderLeft: "2px solid rgba(255,255,255,0.06)",
            }}
          >
            {replies.map((reply) => (
              <div
                key={reply.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ color: "#f0f0ff" }}>{reply.author}</strong>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background:
                          reply.role === "creator"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(108,99,255,0.12)",
                        color: reply.role === "creator" ? "#4ade80" : "#a78bfa",
                      }}
                    >
                      {reply.role === "creator" ? "Creator" : "User"}
                    </span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#8d8db2" }}>
                    {reply.createdAt}
                  </span>
                </div>

                <p
                  style={{
                    margin: "0 0 10px",
                    color: "#cfcfe8",
                    lineHeight: 1.7,
                  }}
                >
                  {reply.message}
                </p>

                <button
                  onClick={() => setReplyTo(comment.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#b8b8d8",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Reply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
              <span style={{ fontWeight: 700, fontSize: 15 }}>
                Web3 <span style={{ color: "#6366f1" }}>Learning</span>
              </span>
            </span>
          </div>
          {["My Course", "Library", "Community", "Wallet"].map((n) => (
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
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <aside
          style={{
            width: "300px",
            minWidth: "300px",
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
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#b8b8d8",
                marginBottom: "8px",
                textTransform: "uppercase",
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
              {unlockedCount} of {courseData.contents.length} contents unlocked
            </p>
          </div>

          {/* Lesson outline */}
          <div
            style={{
              marginTop: "20px",
              marginBottom: "28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "18px 20px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "16px",
                color: "#f0f0ff",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Course Contents
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingRight: "4px",
              }}
            >
              {courseData.contents.map((content) => {
                const unlocked = hasContentAccess(content.id, courseData.id);
                const isActive = activeContentId === content.id;

                return (
                  <button
                    key={content.id}
                    onClick={() => {
                      setActiveContentId(content.id);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "8px",
                      padding: "14px 14px",
                      borderRadius: "12px",
                      border: isActive
                        ? "1px solid rgba(108,99,255,0.45)"
                        : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      textAlign: "left",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(108,99,255,0.22), rgba(139,92,246,0.18))"
                        : "rgba(255,255,255,0.03)",
                      color: "#e8e8f0",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.2,
                          opacity: 0.95,
                        }}
                      >
                        {content.type === "video"
                          ? "🎬"
                          : content.type === "module"
                            ? "📘"
                            : "📝"}
                      </span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "13px",
                            lineHeight: 1.35,
                            color: isActive ? "#fff" : "#e8e8f0",
                            marginBottom: "4px",
                            wordBreak: "break-word",
                          }}
                        >
                          {content.title}
                        </div>

                        <div
                          style={{
                            fontSize: "11px",
                            color: "#8d8db2",
                            lineHeight: 1.3,
                          }}
                        >
                          {content.type === "video"
                            ? "Video"
                            : content.type === "module"
                              ? "Module"
                              : "Article"}{" "}
                          · {content.isFree ? "Free" : `${content.price} mUSD`}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background: content.isFree
                          ? "rgba(34,197,94,0.14)"
                          : unlocked
                            ? "rgba(59,130,246,0.14)"
                            : "rgba(108,99,255,0.16)",
                        color: content.isFree
                          ? "#4ade80"
                          : unlocked
                            ? "#60a5fa"
                            : "#c4b5fd",
                        alignSelf: "flex-end",
                      }}
                    >
                      {content.isFree ? "Free" : unlocked ? "Open" : "Locked"}
                    </div>
                  </button>
                );
              })}
            </div>

            {!hasFullCourseAccess(courseData.id) && (
              <button
                onClick={openFullCoursePaywall}
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                💰 Unlock Full Course — {courseData.fullPrice} mUSD
              </button>
            )}
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
              background: hasContentAccess(activeContent.id, courseData.id)
                ? "rgba(34, 197, 94, 0.12)"
                : "rgba(255, 165, 0, 0.12)",
              border: `1px solid ${
                hasContentAccess(activeContent.id, courseData.id)
                  ? "rgba(34, 197, 94, 0.25)"
                  : "rgba(255, 165, 0, 0.25)"
              }`,
              color: hasContentAccess(activeContent.id, courseData.id)
                ? "#4ade80"
                : "#ffa500",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {hasContentAccess(activeContent.id, courseData.id) ? "🔓" : "🔒"}
            {hasContentAccess(activeContent.id, courseData.id)
              ? activeContent.isFree
                ? "Free Content"
                : "Unlocked Content"
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
              {activeContent.type === "video"
                ? `${courseData.title} — ${activeContent.title}`
                : activeContent.title}
            </h1>

            <button
              onClick={() => {
                if (!hasContentAccess(activeContent.id, courseData.id)) return;
                const newList = completed
                  ? completedList.filter((id) => id !== activeContentId)
                  : [...completedList, activeContentId];
                setCompletedList(newList);
                setCompleted(!completed);
                localStorage.setItem(
                  COMPLETED_STORAGE_KEY,
                  JSON.stringify(newList),
                );
              }}
              disabled={!hasContentAccess(activeContent.id, courseData.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: completed
                  ? "1px solid rgba(34,197,94,0.4)"
                  : hasContentAccess(activeContent.id, courseData.id)
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid rgba(255,255,255,0.06)",
                background: completed
                  ? "rgba(34,197,94,0.12)"
                  : hasContentAccess(activeContent.id, courseData.id)
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.02)",
                color: hasContentAccess(activeContent.id, courseData.id)
                  ? completed
                    ? "#4ade80"
                    : "#aaa"
                  : "#555",
                fontSize: "13px",
                fontWeight: 600,
                cursor: hasContentAccess(activeContent.id, courseData.id)
                  ? "pointer"
                  : "not-allowed",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                flexShrink: 0,
                opacity: hasContentAccess(activeContent.id, courseData.id) ? 1 : 0.5,
              }}
            >
              {!hasContentAccess(activeContent.id, courseData.id)
                ? "🔒"
                : completed
                  ? "✓"
                  : "○"}{" "}
              {hasContentAccess(activeContent.id, courseData.id)
                ? "Mark Complete"
                : "Locked"}
            </button>
          </div>

          <p
            style={{ color: "#7878a0", fontSize: "13px", marginBottom: "24px" }}
          >
            {activeContent.type === "video"
              ? "Part of the Foundation Series · 12 mins watch"
              : activeContent.type === "module"
                ? "Module document preview"
                : "Reading material"}
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
            {hasContentAccess(activeContent.id, courseData.id) ? (
              activeContent.type === "video" ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    background: "#000",
                  }}
                >
                  <iframe
                    src={`https://drive.google.com/file/d/${activeContent.source}/preview`}
                    title={activeContent.title}
                    allow="autoplay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </div>
              ) : activeContent.type === "module" ? (
                <div style={{ padding: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#8d8db2",
                      }}
                    >
                      Modul preview
                    </p>

                    <a
                      href={activeContent.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in new tab"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(108,99,255,0.12)",
                        border: "1px solid rgba(108,99,255,0.22)",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      ↗
                    </a>
                  </div>

                  <div
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "#0b0b18",
                    }}
                  >
                    <iframe
                      src={activeContent.source}
                      title={activeContent.title}
                      style={{
                        width: "100%",
                        height: "760px",
                        border: "none",
                        display: "block",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ padding: "28px 30px" }}>
                  <h2
                    style={{
                      fontSize: "34px",
                      fontWeight: 800,
                      color: "#f0f0ff",
                      marginBottom: "16px",
                      fontFamily: "'Georgia', serif",
                      lineHeight: 1.2,
                    }}
                  >
                    {activeContent.title}
                  </h2>

                  <p
                    style={{
                      color: "#a0a0c0",
                      lineHeight: 1.9,
                      fontSize: "16px",
                      marginBottom: "28px",
                    }}
                  >
                    {activeContent.body}
                  </p>

                  {activeContent.highlightTitle &&
                    activeContent.highlightBody && (
                      <div
                        style={{
                          borderRadius: "12px",
                          border: "1px solid rgba(108,99,255,0.2)",
                          background: "rgba(108,99,255,0.06)",
                          padding: "20px 24px",
                          marginBottom: "28px",
                        }}
                      >
                        <p
                          style={{
                            color: "#a78bfa",
                            fontWeight: 700,
                            fontSize: "16px",
                            marginBottom: "8px",
                          }}
                        >
                          {activeContent.highlightTitle}
                        </p>
                        <p
                          style={{
                            color: "#9090b8",
                            fontSize: "14px",
                            lineHeight: 1.7,
                            margin: 0,
                          }}
                        >
                          {activeContent.highlightBody}
                        </p>
                      </div>
                    )}
                </div>
              )
            ) : (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "#9999bb",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>🔒</div>

                <div
                  style={{
                    color: "#f0f0ff",
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {activeContent.title}
                </div>

                <div style={{ marginBottom: "18px" }}>
                  Buy this{" "}
                  {activeContent.type === "video"
                    ? "video"
                    : activeContent.type === "module"
                      ? "module"
                      : "article"}{" "}
                  to unlock it.
                </div>

                <button
                  onClick={() => openContentPaywall(activeContent)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Buy To Unlock
                </button>
              </div>
            )}
          </div>

          {/* KOLOM DISKUSI */}

          <div
            style={{
              marginTop: "28px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "20px 24px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "16px",
                color: "#f0f0ff",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Discussion Panel
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "20px",
              }}
            >
              {rootComments.length === 0 ? (
                <p style={{ color: "#8d8db2", margin: 0 }}>
                  No discussion yet for this content.
                </p>
              ) : (
                rootComments.map((comment) => renderCommentThread(comment))
              )}
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "16px",
              }}
            >
              {replyTo && (
                <p style={{ color: "#a78bfa", fontSize: "12px", marginTop: 0 }}>
                  Replying to this thread
                </p>
              )}

              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your question, feedback, or suggestion..."
                style={{
                  width: "100%",
                  minHeight: "110px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#f0f0ff",
                  padding: "14px 16px",
                  fontSize: "14px",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setNewComment("");
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#b8b8d8",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>

                <button
                  onClick={handleAddComment}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>

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
            <button
              onClick={openTipModal}
              onMouseEnter={() => setIsTipHovered(true)}
              onMouseLeave={() => setIsTipHovered(false)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: isTipHovered
                  ? "linear-gradient(135deg, #4ade80, #15803d)"
                  : "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                transform: isTipHovered ? "translateY(-1px)" : "translateY(0)",
                boxShadow: isTipHovered
                  ? "0 8px 20px rgba(34, 197, 94, 0.28)"
                  : "0 4px 12px rgba(34, 197, 94, 0.18)",
              }}
            >
              Send Your Tip
            </button>
          </div>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onSuccess={() => {
          setShowPaywallModal(false);

          if (paywallMode === "content" || paywallMode === "course") {
            const stored = localStorage.getItem("accessList");
            setAccessList(stored ? JSON.parse(stored) : []);
          }

          if (paywallMode === "content" && selectedContent) {
            setActiveContentId(selectedContent.id);
          }
        }}
        contentTitle={
          paywallMode === "course"
            ? courseData.title
            : paywallMode === "tip"
              ? "Support the Instructor"
              : selectedContent?.title || "Content"
        }
        creatorAddress="0xCreatorWalletAddress123456789abcdef"
        paymentScope={paywallMode}
        contentId={paywallMode === "content" ? selectedContent?.id : undefined}
        courseId={paywallMode === "course" ? courseData.id : undefined}
        price={
          paywallMode === "course"
            ? courseData.fullPrice
            : paywallMode === "tip"
              ? "2.00"
              : selectedContent?.price || "0.00"
        }
      />
    </main>
  );
}
