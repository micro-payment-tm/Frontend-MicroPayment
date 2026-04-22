"use client";

import { useRouter } from "next/navigation";

type Course = {
  id: string;
  title: string;
  level: string;
  students: number;
  duration: string;
  image: string;
  status: "Draft" | "Published";
};

const courses: Course[] = [
  {
    id: "1",
    title: "Quantum Entanglement 101",
    level: "INTERMEDIATE",
    students: 320,
    duration: "12h content",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
  },
  {
    id: "2",
    title: "Particle Physics",
    level: "BEGINNER",
    students: 500,
    duration: "8h content",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    status: "Draft",
  },
  {
    id: "3",
    title: "Relativity Explained",
    level: "ADVANCED",
    students: 210,
    duration: "15h content",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ padding: "12px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#fff",
            margin: 0,
          }}
        >
          My Courses
        </h1>

        <button
          style={primaryBtn}
          onClick={() => router.push("/creator/courses/new")}
        >
          + Create New Course
        </button>
      </div>

      {/* COURSE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {courses.map((course) => (
          <div key={course.id} style={card}>
            <div style={{ position: "relative", height: "180px" }}>
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <span style={badge(course.status)}>
                {course.status}
              </span>
            </div>

            <div style={{ marginTop: "12px" }}>
              <h3 style={{ margin: 0 }}>{course.title}</h3>

              <div style={meta}>
                <span>{course.students} students</span>
                <span>{course.duration}</span>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  style={manageBtn}
                  onClick={() =>
                    router.push(`/creator/courses/${course.id}`)
                  }
                >
                  Manage
                </button>

                <button style={iconBtn}>⤴</button>
              </div>
            </div>
          </div>
        ))}

        {/* CREATE CARD */}
        <div style={{ ...createCard, cursor: "pointer" }} onClick={() => router.push("/creator/courses/new")}>
          <div style={{ fontSize: "48px", color: "#6d4cff" }}>+</div>
          <p>Create New Course</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLE ---------------- */

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "16px",
  padding: "12px",
};

const meta: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  color: "#aaa",
  marginTop: "6px",
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "12px",
  background: "#6d4cff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
};

const manageBtn: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  background: "rgba(109,76,255,0.12)",
  color: "#6d4cff",
  border: "none",
  cursor: "pointer",
};

const iconBtn: React.CSSProperties = {
  width: "44px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

const createCard: React.CSSProperties = {
  border: "2px dashed rgba(109,76,255,0.3)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "260px",
  color: "#aaa",
};

const badge = (status: string): React.CSSProperties => ({
  position: "absolute",
  top: "10px",
  left: "10px",
  padding: "6px 10px",
  borderRadius: "8px",
  background:
    status === "Published"
      ? "rgba(16,185,129,0.8)"
      : "rgba(245,158,11,0.8)",
  color: "#fff",
  fontSize: "12px",
});