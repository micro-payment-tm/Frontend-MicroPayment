"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

type CourseMeta = {
  id: string;
  title: string;
  category: string;
  level: string;
  status: "Draft" | "Published";
};

type Student = {
  id: string;
  name: string;
  email: string;
  progress: number;
  enrolledAt: string;
  status: "Active" | "Completed" | "Inactive";
};

const courseMetaList: CourseMeta[] = [
  {
    id: "1",
    title: "Quantum Entanglement 101",
    category: "Physics",
    level: "INTERMEDIATE",
    status: "Published",
  },
  {
    id: "2",
    title: "Particle Physics",
    category: "Physics",
    level: "BEGINNER",
    status: "Draft",
  },
  {
    id: "3",
    title: "Relativity Explained",
    category: "Physics",
    level: "ADVANCED",
    status: "Published",
  },
];

const studentsByCourse: Record<string, Student[]> = {
  "1": [
    {
      id: "s1",
      name: "Alice Morgan",
      email: "alice@example.com",
      progress: 76,
      enrolledAt: "2026-04-02",
      status: "Active",
    },
    {
      id: "s2",
      name: "Reno Pratama",
      email: "reno@example.com",
      progress: 100,
      enrolledAt: "2026-03-21",
      status: "Completed",
    },
    {
      id: "s3",
      name: "Diana Kusuma",
      email: "diana@example.com",
      progress: 21,
      enrolledAt: "2026-04-10",
      status: "Active",
    },
  ],
  "2": [
    {
      id: "s4",
      name: "Michael Tan",
      email: "michael@example.com",
      progress: 14,
      enrolledAt: "2026-04-11",
      status: "Inactive",
    },
  ],
  "3": [
    {
      id: "s5",
      name: "Satria Wibowo",
      email: "satria@example.com",
      progress: 64,
      enrolledAt: "2026-03-29",
      status: "Active",
    },
    {
      id: "s6",
      name: "Nadia Putri",
      email: "nadia@example.com",
      progress: 88,
      enrolledAt: "2026-03-17",
      status: "Active",
    },
    {
      id: "s7",
      name: "Kevin Aditya",
      email: "kevin@example.com",
      progress: 100,
      enrolledAt: "2026-03-02",
      status: "Completed",
    },
  ],
};

export default function Page(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const course = useMemo(
    () => courseMetaList.find((item) => item.id === courseId),
    [courseId]
  );

  const students = (courseId && studentsByCourse[courseId]) ?? [];

  const activeCount = students.filter((s) => s.status === "Active").length;
  const completedCount = students.filter((s) => s.status === "Completed").length;
  const averageProgress =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.progress, 0) /
            students.length
        )
      : 0;

  if (!course) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        <h1 style={{ margin: 0, fontSize: "30px" }}>Course Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          The requested students page cannot be loaded.
        </p>
        <button
          style={primaryBtn}
          onClick={() => router.push("/creator/courses")}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px", color: "#fff" }}>
      <section
        style={{
          ...panel,
          padding: "20px",
          background:
            "linear-gradient(115deg, rgba(27,21,55,0.97), rgba(34,28,68,0.93), rgba(58,46,110,0.70))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={chip}>{course.category}</span>
              <span style={chip}>{course.level}</span>
              <span style={statusChip(course.status)}>{course.status}</span>
              <span style={chip}>Students</span>
            </div>

            <h1
              style={{
                margin: "16px 0 0 0",
                fontSize: "36px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              {course.title} — Students
            </h1>

            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Review enrolled learners, monitor their progress, and observe
              course completion status.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={secondaryBtn}
              onClick={() => router.push(`/creator/courses/${course.id}`)}
            >
              Back
            </button>
            <button
              style={secondaryBtn}
              onClick={() => router.push(`/creator/courses/${course.id}/curriculum`)}
            >
              Curriculum
            </button>
            <button
              style={primaryBtn}
              onClick={() => router.push(`/creator/courses/${course.id}/analytics`)}
            >
              Analytics
            </button>
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
          <StatCard label="Total Students" value={String(students.length)} />
          <StatCard label="Active" value={String(activeCount)} />
          <StatCard label="Completed" value={String(completedCount)} accent />
          <StatCard label="Avg Progress" value={`${averageProgress}%`} />
        </div>
      </section>

      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: "14px",
          alignItems: "start",
        }}
      >
        <div style={{ ...panel, padding: "18px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "28px" }}>Student List</h2>
            <button style={softBtn}>Export CSV</button>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {students.length === 0 ? (
              <div style={emptyState}>No students enrolled yet.</div>
            ) : (
              students.map((student) => (
                <div key={student.id} style={studentCard}>
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
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.94)",
                        }}
                      >
                        {student.name}
                      </div>
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.52)",
                        }}
                      >
                        {student.email}
                      </div>
                    </div>

                    <span style={studentStatusChip(student.status)}>
                      {student.status}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      display: "grid",
                      gridTemplateColumns: "140px 1fr 120px",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "rgba(255,255,255,0.62)", fontSize: "13px" }}>
                      Enrolled: {student.enrolledAt}
                    </div>

                    <div>
                      <div
                        style={{
                          height: "10px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${student.progress}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #5f47ff, #8b5cf6)",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {student.progress}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Summary</h3>
            <MiniStat label="Total Enrolled" value={String(students.length)} />
            <MiniStat label="Active Learners" value={String(activeCount)} />
            <MiniStat label="Completed Learners" value={String(completedCount)} />
            <MiniStat label="Average Progress" value={`${averageProgress}%`} />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Actions</h3>
            <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
              <button style={secondaryWideBtn}>Send Announcement</button>
              <button style={secondaryWideBtn}>Invite More Students</button>
              <button style={secondaryWideBtn}>Review Completion Report</button>
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

const studentStatusChip = (
  status: "Active" | "Completed" | "Inactive"
): React.CSSProperties => ({
  borderRadius: "999px",
  padding: "6px 12px",
  background:
    status === "Completed"
      ? "rgba(16,185,129,0.18)"
      : status === "Active"
        ? "rgba(109,76,255,0.18)"
        : "rgba(156,163,175,0.18)",
  color:
    status === "Completed"
      ? "#34d399"
      : status === "Active"
        ? "#a78bfa"
        : "#cbd5e1",
  fontSize: "12px",
  fontWeight: 700,
});

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

const softBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "14px",
  background: "rgba(109,76,255,0.10)",
  border: "1px solid rgba(109,76,255,0.20)",
  color: "#a78bfa",
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

const studentCard: React.CSSProperties = {
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.025)",
  padding: "16px",
};

const emptyState: React.CSSProperties = {
  borderRadius: "16px",
  border: "1px dashed rgba(255,255,255,0.12)",
  padding: "16px",
  color: "rgba(255,255,255,0.42)",
  textAlign: "center",
  fontSize: "14px",
};