"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

type Course = {
  id: string;
  title: string;
  category: string;
  level: string;
  students: number;
  duration: string;
  image: string;
  status: "Draft" | "Published";
  price: string;
  description: string;
  completionRate: string;
  earnings: string;
};

const courses: Course[] = [
  {
    id: "1",
    title: "Quantum Entanglement 101",
    category: "Physics",
    level: "INTERMEDIATE",
    students: 320,
    duration: "12h content",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    price: "0.45 ETH",
    description:
      "An intermediate-level course covering the conceptual and mathematical foundations of quantum entanglement and its modern applications.",
    completionRate: "82%",
    earnings: "2.8 ETH",
  },
  {
    id: "2",
    title: "Particle Physics",
    category: "Physics",
    level: "BEGINNER",
    students: 500,
    duration: "8h content",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    status: "Draft",
    price: "0.30 ETH",
    description:
      "A beginner-friendly introduction to particles, forces, and the standard model for students entering modern physics.",
    completionRate: "71%",
    earnings: "1.6 ETH",
  },
  {
    id: "3",
    title: "Relativity Explained",
    category: "Physics",
    level: "ADVANCED",
    students: 210,
    duration: "15h content",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    price: "0.60 ETH",
    description:
      "An advanced course focused on special and general relativity, spacetime reasoning, and theoretical interpretation.",
    completionRate: "77%",
    earnings: "3.4 ETH",
  },
];

export default function Page(): JSX.Element {
  const params = useParams();
  const router = useRouter();

  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const course = useMemo(
    () => courses.find((item) => item.id === courseId),
    [courseId]
  );

  if (!course) {
    return (
      <div style={{ padding: "16px", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: "28px" }}>Course Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          The requested course does not exist.
        </p>
        <button style={primaryBtn} onClick={() => router.push("/creator/courses")}>
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px", color: "#fff" }}>
      {/* Header */}
      <section
        style={{
          ...panel,
          padding: "18px",
          background:
            "linear-gradient(115deg, rgba(27,21,55,0.97), rgba(34,28,68,0.93), rgba(58,46,110,0.70))",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px minmax(0, 1fr)",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              height: "220px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span style={chip}>{course.category}</span>
                  <span style={chip}>{course.level}</span>
                  <span style={statusChip(course.status)}>{course.status}</span>
                </div>

                <h1
                  style={{
                    fontSize: "34px",
                    margin: "14px 0 0 0",
                    lineHeight: 1.2,
                    color: "rgba(255,255,255,0.96)",
                  }}
                >
                  {course.title}
                </h1>

                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.72)",
                    maxWidth: "780px",
                  }}
                >
                  {course.description}
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  style={secondaryBtn}
                  onClick={() => router.push("/creator/courses")}
                >
                  Back
                </button>
                <button
                  style={secondaryBtn}
                  onClick={() => router.push(`/creator/courses/${course.id}/curriculum`)}
                >
                  Curriculum
                </button>
                <button style={primaryBtn}>Publish</button>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <StatCard label="Students" value={String(course.students)} />
              <StatCard label="Duration" value={course.duration} />
              <StatCard label="Price" value={course.price} accent />
              <StatCard label="Completion" value={course.completionRate} />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation cards */}
      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "14px",
        }}
      >
        <ActionCard
          title="My Curriculum"
          description="Manage sections, lessons, lesson types, and access control."
          buttonLabel="Open Curriculum"
          onClick={() => router.push(`/creator/courses/${course.id}/curriculum`)}
        />
        <ActionCard
          title="Students"
          description="Review enrollments, student activity, and learning progress."
          buttonLabel="Open Students"
          onClick={() => router.push(`/creator/courses/${course.id}/students`)}
        />
        <ActionCard
          title="Analytics"
          description="Track earnings, engagement, and course completion performance."
          buttonLabel="Open Analytics"
          onClick={() => router.push(`/creator/courses/${course.id}/analytics`)}
        />
      </section>

      {/* Details */}
      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: "14px",
        }}
      >
        <div style={{ ...panel, padding: "18px" }}>
          <h2 style={{ margin: 0, fontSize: "24px" }}>Course Details</h2>

          <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
            <Field label="Course Title" value={course.title} />
            <Field label="Category" value={course.category} />
            <Field label="Level" value={course.level} />
            <Field label="Price" value={course.price} />
            <TextField label="Description" value={course.description} />
          </div>

          <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
            <button style={primaryBtn}>Save Changes</button>
            <button style={secondaryBtn}>Preview Course</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Performance</h3>
            <MiniStat label="Students" value={String(course.students)} />
            <MiniStat label="Completion Rate" value={course.completionRate} />
            <MiniStat label="Earnings" value={course.earnings} />
            <MiniStat label="Status" value={course.status} />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Actions</h3>
            <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
              <button
                style={secondaryWideBtn}
                onClick={() => router.push(`/creator/courses/${course.id}/curriculum`)}
              >
                Edit Curriculum
              </button>
              <button style={secondaryWideBtn}>Duplicate Course</button>
              <button style={dangerWideBtn}>Archive Course</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}): JSX.Element {
  return (
    <div style={{ ...panel, padding: "14px 16px" }}>
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "10px",
          fontSize: "24px",
          fontWeight: 700,
          color: accent ? "#a78bfa" : "#fff",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <div style={{ ...panel, padding: "18px" }}>
      <h3 style={{ margin: 0, fontSize: "22px" }}>{title}</h3>
      <p
        style={{
          marginTop: "10px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.62)",
        }}
      >
        {description}
      </p>
      <button style={{ ...primaryBtn, marginTop: "12px" }} onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <input value={value} readOnly style={inputStyle} />
    </div>
  );
}

function TextField({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <textarea value={value} readOnly rows={5} style={textAreaStyle} />
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div style={{ marginTop: "14px" }}>
      <div style={{ color: "rgba(255,255,255,0.42)", fontSize: "12px" }}>
        {label}
      </div>
      <div style={{ marginTop: "4px", color: "#fff", fontSize: "18px" }}>
        {value}
      </div>
    </div>
  );
}

const panel: React.CSSProperties = {
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.04)",
  boxShadow: "0 18px 55px rgba(0,0,0,0.22)",
};

const chip: React.CSSProperties = {
  borderRadius: "999px",
  padding: "6px 12px",
  background: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.8)",
  fontSize: "12px",
  fontWeight: 700,
};

const statusChip = (status: "Draft" | "Published"): React.CSSProperties => ({
  borderRadius: "999px",
  padding: "6px 12px",
  background:
    status === "Published"
      ? "rgba(16,185,129,0.18)"
      : "rgba(245,158,11,0.18)",
  color: status === "Published" ? "#34d399" : "#fbbf24",
  fontSize: "12px",
  fontWeight: 700,
});

const labelStyle: React.CSSProperties = {
  marginBottom: "8px",
  fontSize: "13px",
  color: "rgba(255,255,255,0.55)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
  color: "#fff",
  padding: "14px 16px",
  fontSize: "14px",
  outline: "none",
};

const textAreaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  lineHeight: 1.7,
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

const secondaryBtn: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "12px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryWideBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  textAlign: "left",
};

const dangerWideBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(239,68,68,0.10)",
  border: "1px solid rgba(239,68,68,0.22)",
  color: "#fca5a5",
  cursor: "pointer",
  fontWeight: 700,
  textAlign: "left",
};