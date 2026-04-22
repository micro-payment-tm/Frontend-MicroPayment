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

type AnalyticsData = {
  enrolled: number;
  activeLearners: number;
  completionRate: string;
  earnings: string;
  rating: string;
  monthlyViews: number[];
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

const analyticsByCourse: Record<string, AnalyticsData> = {
  "1": {
    enrolled: 320,
    activeLearners: 264,
    completionRate: "82%",
    earnings: "2.8 ETH",
    rating: "4.8 ★",
    monthlyViews: [22, 36, 48, 31, 57, 68, 74],
  },
  "2": {
    enrolled: 500,
    activeLearners: 190,
    completionRate: "71%",
    earnings: "1.6 ETH",
    rating: "4.6 ★",
    monthlyViews: [18, 22, 27, 34, 29, 38, 45],
  },
  "3": {
    enrolled: 210,
    activeLearners: 164,
    completionRate: "77%",
    earnings: "3.4 ETH",
    rating: "4.9 ★",
    monthlyViews: [26, 30, 42, 52, 48, 59, 67],
  },
};

export default function Page(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!courseId) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        <h1 style={{ margin: 0, fontSize: "30px" }}>Analytics Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          The requested analytics page cannot be loaded.
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

  const course = useMemo(
    () => courseMetaList.find((item) => item.id === courseId),
    [courseId]
  );

  const analytics = analyticsByCourse[courseId];

  if (!course || !analytics) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        <h1 style={{ margin: 0, fontSize: "30px" }}>Analytics Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          The requested analytics page cannot be loaded.
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
              <span style={chip}>Analytics</span>
            </div>

            <h1
              style={{
                margin: "16px 0 0 0",
                fontSize: "36px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              {course.title} — Analytics
            </h1>

            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Monitor course engagement, learner completion, and revenue
              performance over time.
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
              onClick={() => router.push(`/creator/courses/${course.id}/students`)}
            >
              Students
            </button>
            <button
              style={primaryBtn}
              onClick={() => router.push(`/creator/courses/${course.id}/curriculum`)}
            >
              Curriculum
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
          <StatCard label="Enrolled" value={String(analytics.enrolled)} />
          <StatCard label="Active" value={String(analytics.activeLearners)} />
          <StatCard label="Completion" value={analytics.completionRate} accent />
          <StatCard label="Earnings" value={analytics.earnings} />
          <StatCard label="Rating" value={analytics.rating} />
        </div>
      </section>

      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
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
            }}
          >
            <h2 style={{ margin: 0, fontSize: "28px" }}>Engagement Overview</h2>
            <button style={softBtn}>Download Report</button>
          </div>

          <div
            style={{
              marginTop: "18px",
              height: "220px",
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            {analytics.monthlyViews.map((value, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: "100%",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${value}%`,
                    borderRadius: "12px 12px 0 0",
                    background:
                      index >= analytics.monthlyViews.length - 2
                        ? "linear-gradient(to top, #5f47ff, #8b5cf6)"
                        : "rgba(109,76,255,0.55)",
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  W{index + 1}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.55)",
              fontSize: "13px",
            }}
          >
            <span>Engagement trend by period</span>
            <span>Updated this week</span>
          </div>
        </div>

        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Performance Summary</h3>
            <MiniStat label="Enrolled Learners" value={String(analytics.enrolled)} />
            <MiniStat
              label="Active Learners"
              value={String(analytics.activeLearners)}
            />
            <MiniStat
              label="Completion Rate"
              value={analytics.completionRate}
            />
            <MiniStat label="Revenue" value={analytics.earnings} />
            <MiniStat label="Rating" value={analytics.rating} />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Actions</h3>
            <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
              <button style={secondaryWideBtn}>Open Revenue Breakdown</button>
              <button style={secondaryWideBtn}>Review Completion Report</button>
              <button style={secondaryWideBtn}>Compare Weekly Trends</button>
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