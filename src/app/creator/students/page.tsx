"use client";

type StudentItem = {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  enrolledAt: string;
  status: "Active" | "Completed" | "Inactive";
};

const students: StudentItem[] = [
  {
    id: "s1",
    name: "Alice Morgan",
    email: "alice@example.com",
    course: "Quantum Entanglement 101",
    progress: 76,
    enrolledAt: "2026-04-02",
    status: "Active",
  },
  {
    id: "s2",
    name: "Reno Pratama",
    email: "reno@example.com",
    course: "Quantum Entanglement 101",
    progress: 100,
    enrolledAt: "2026-03-21",
    status: "Completed",
  },
  {
    id: "s3",
    name: "Diana Kusuma",
    email: "diana@example.com",
    course: "Particle Physics",
    progress: 21,
    enrolledAt: "2026-04-10",
    status: "Active",
  },
  {
    id: "s4",
    name: "Michael Tan",
    email: "michael@example.com",
    course: "Particle Physics",
    progress: 14,
    enrolledAt: "2026-04-11",
    status: "Inactive",
  },
  {
    id: "s5",
    name: "Satria Wibowo",
    email: "satria@example.com",
    course: "Relativity Explained",
    progress: 64,
    enrolledAt: "2026-03-29",
    status: "Active",
  },
  {
    id: "s6",
    name: "Nadia Putri",
    email: "nadia@example.com",
    course: "Relativity Explained",
    progress: 88,
    enrolledAt: "2026-03-17",
    status: "Active",
  },
  {
    id: "s7",
    name: "Kevin Aditya",
    email: "kevin@example.com",
    course: "Relativity Explained",
    progress: 100,
    enrolledAt: "2026-03-02",
    status: "Completed",
  },
];

export default function Page(): JSX.Element {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const completedStudents = students.filter(
    (s) => s.status === "Completed"
  ).length;
  const inactiveStudents = students.filter((s) => s.status === "Inactive").length;

  const averageProgress =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.progress, 0) /
            students.length
        )
      : 0;

  return (
    <div style={{ padding: "12px", color: "#fff" }}>
      {/* HEADER */}
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
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={chip}>Students Hub</span>
              <span style={chip}>Global Overview</span>
              <span style={chip}>Enrollment Tracking</span>
            </div>

            <h1
              style={{
                margin: "16px 0 0 0",
                fontSize: "36px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              Students Overview
            </h1>

            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
                maxWidth: "760px",
              }}
            >
              Monitor all enrolled students across your courses, review their
              progress, and identify active or completed learners.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={secondaryBtn}>Export Data</button>
            <button style={secondaryBtn}>Send Notice</button>
            <button style={primaryBtn}>Invite Students</button>
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
          <StatCard label="Total Students" value={String(totalStudents)} accent />
          <StatCard label="Active" value={String(activeStudents)} />
          <StatCard label="Completed" value={String(completedStudents)} />
          <StatCard label="Inactive" value={String(inactiveStudents)} />
          <StatCard label="Avg Progress" value={`${averageProgress}%`} />
        </div>
      </section>

      {/* MAIN */}
      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 340px",
          gap: "14px",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "grid", gap: "14px" }}>
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
              <button style={softBtn}>Filter by Course</button>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {students.map((student) => (
                <div key={student.id} style={studentCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
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
                          color: "rgba(255,255,255,0.5)",
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
                      gridTemplateColumns: "1.2fr 1fr 120px",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        Course
                      </div>
                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "15px",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        {student.course}
                      </div>
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
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        Enrolled: {student.enrolledAt}
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {student.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Student Summary</h3>
            <MiniStat label="Total Students" value={String(totalStudents)} />
            <MiniStat label="Active Learners" value={String(activeStudents)} />
            <MiniStat label="Completed Learners" value={String(completedStudents)} />
            <MiniStat label="Inactive Learners" value={String(inactiveStudents)} />
            <MiniStat label="Average Progress" value={`${averageProgress}%`} />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Actions</h3>
            <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
              <button style={secondaryWideBtn}>Send Bulk Message</button>
              <button style={secondaryWideBtn}>Export Enrollments</button>
              <button style={secondaryWideBtn}>Generate Progress Report</button>
            </div>
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>💡 Tips & Insights</h3>

            <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
              <TipItem
                title="Support Inactive Learners"
                desc="Send reminders or short summaries to re-engage students with very low progress."
              />
              <TipItem
                title="Highlight Completion Milestones"
                desc="Celebrate students who finish courses to improve retention and encourage referrals."
              />
              <TipItem
                title="Track Course Performance"
                desc="Compare student completion by course to identify your strongest and weakest learning flows."
              />
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

function TipItem({
  title,
  desc,
}: {
  title: string;
  desc: string;
}): JSX.Element {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#a78bfa",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
        }}
      >
        {desc}
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