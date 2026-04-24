"use client";
import { useRouter } from "next/navigation";

type CourseCardItem = {
  id: string;
  title: string;
  level: string;
  students: number;
  duration: string;
  image: string;
};

type TipItem = {
  user: string;
  time: string;
  amount: string;
  accent: "violet" | "pink" | "cyan";
};

const courses: CourseCardItem[] = [
  {
    id: "1",
    title: "Quantum Entanglement 101",
    level: "INTERMEDIATE",
    students: 320,
    duration: "12h content",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Particle Physics",
    level: "BEGINNER",
    students: 500,
    duration: "8h content",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Relativity Explained",
    level: "ADVANCED",
    students: 210,
    duration: "15h content",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
];


const tips: TipItem[] = [
  {
    user: "User_921",
    time: "2 minutes ago",
    amount: "0.05 ETH",
    accent: "violet",
  },
  {
    user: "Alice_Web3",
    time: "1 hour ago",
    amount: "120 MUSDD",
    accent: "pink",
  },
  {
    user: "Block_Mage",
    time: "4 hours ago",
    amount: "0.02 ETH",
    accent: "cyan",
  },
];

const chartBars: number[] = [38, 52, 26, 60, 39, 82, 64];

const panelIconStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(109,76,255,0.1)",
  border: "1px solid rgba(109,76,255,0.25)",
  color: "#6d4cff",
};

const sidePanelStyle: React.CSSProperties = {
  borderRadius: "1px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.04)",
  padding: "12px",
  boxShadow: "0 18px 55px rgba(0,0,0,0.22)",
};

export default function Page(): JSX.Element {
  const router = useRouter();
  return (
    <div style={{ padding: "2px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.95)",
          margin: "0 0 16px 0",
        }}
      >
        Dashboard
      </h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: "22px",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "30px",
          padding: "18px 26px",
          background:
            "linear-gradient(115deg, rgba(27,21,55,0.97), rgba(34,28,68,0.93), rgba(58,46,110,0.70))",
          boxShadow: "0 24px 70px rgba(0,0,0,0.24)",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "190px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "156px",
              height: "156px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(109,76,255,0.45)",
              background: "#121a31",
              boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
              alt="Professor"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              right: "6px",
              bottom: "-10px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #12b71a, #0b8d0b)",
              fontSize: "12px",
              fontWeight: 700,
              boxShadow: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ✓ VERIFIED
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "32px",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.94)",
                  margin: 0,
                  letterSpacing: "-0.005em",
                }}
              >
                Prof. Haliim Pamungkas.
              </h1>

              <div
                style={{
                  marginTop: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    height: "42px",
                    padding: "0 8px",
                    borderRadius: "12px",
                    background: "rgba(109,76,255,0.12)",
                    color: "#7f63ff",
                    border: "1px solid rgba(109,76,255,0.16)",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px",
                      height: "18px",
                      fontSize: "21px",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    💳
                  </span>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "18px",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    0x892...32c1
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText("0x892123456789abcdef32c1")
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#aaa",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "18px",
                color: "#5f47ff",
                whiteSpace: "nowrap",
                paddingTop: "6px",
                fontWeight: 600,
                alignItems: "center",
              }}
            >
              (@s_jenkins)
            </div>
          </div>

          <p
            style={{
              maxWidth: "900px",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.76)",
              margin: "28px 0 0 0",
            }}
          >
            Quantum Physics researcher at CERN. Passionate about decentralizing
            education and micro-payments for science.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <StatCard label="STUDENTS" value="1.2k" />
            <StatCard label="COURSES" value="8" />
            <StatCard label="EARNED" value="4.5 ETH" accent="#6d4cff" />
            <StatCard label="RATING" value="4.9 ★" />
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: "8px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                margin: 0,
                fontWeight: 700,
                color: "rgba(255,255,255,0.94)",
              }}
            >
              Created Courses
            </h2>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#6d4cff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
              alignItems: "start",
            }}
          >
            {courses.slice(0, 2).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onManage={() => router.push(`/creator/courses/${course.id}`)} />
            ))}

            <CourseCard course={courses[2]}
              onManage={() => router.push(`/creator/courses/${courses[2].id}`)}
            />

            <div
            
              onClick={() => router.push("/creator/courses/new")}
              style={{
                cursor: "pointer",
                overflow: "hidden",
                minHeight: "360px",
                borderRadius: "16px",
                border: "2px dashed rgba(109,76,255,0.28)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "inset 0 0 40px rgba(70,50,180,0.08)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "999px",
                  border: "2px solid #6d4cff",
                  color: "#6d4cff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  marginBottom: "11px",
                }}
              >
                +
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Draft New Course
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Start a new scientific journey
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div style={sidePanelStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <span style={panelIconStyle}>▣</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "22px",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                Teaching Stats
              </h3>
            </div>

            <div
              style={{
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.84)",
              }}
            >
              Student Growth (MTD)
            </div>

            <div
              style={{
                marginTop: "4px",
                height: "120px",
                display: "flex",
                alignItems: "flex-end",
                gap: "4px",
              }}
            >
              {chartBars.map((value, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "8px 8px 0 0",
                      background:
                        index >= 5
                          ? "linear-gradient(to top, #4930d8, #6d4cff)"
                          : "rgba(109,76,255,0.55)",
                      height: `${value}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "14px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <span>Week 01</span>
              <span>Current</span>
            </div>

            <div
              style={{
                marginTop: "8px",
                borderRadius: "16px",
                border: "1px solid rgba(109,76,255,0.14)",
                background: "rgba(109,76,255,0.06)",
                padding: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(109,76,255,0.9)",
                }}
              >
                Top Performing
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "28px",
                  color: "rgb(255, 255, 255)",
                }}
              >
                Particle Physics
              </div>
              <div
                style={{
                  marginTop: "2px",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                85% Completion Rate
              </div>
            </div>
          </div>

          <div style={sidePanelStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <span style={panelIconStyle}>*_*</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "22px",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                Recent Tips
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {tips.map((tip) => (
                <TipCard key={tip.user} tip={tip} />
              ))}
            </div>

            <button
              style={{
                marginTop: "14px",
                width: "100%",
                border: "none",
                borderRadius: "16px",
                padding: "18px 20px",
                background: "linear-gradient(90deg, #5f47ff, #6f5cff)",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 14px 36px rgba(88,64,255,0.28)",
              }}
            >
              Withdraw Funds
            </button>
            <p
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Gas fees will be automatically calculated.
            </p>
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
  accent?: string;
}): JSX.Element {
  return (
    <div
      style={{
        borderRadius: "14px",
        padding: "14px 16px",
        minHeight: "96px",
        border: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(255,255,255,0.035)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.24em",
          color: "rgba(255,255,255,0.34)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: 600,
          color: accent ?? "rgba(255,255,255,0.94)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TipCard({ tip }: { tip: TipItem }): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.035)",
        padding: "12px",
        gap: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            padding: "2px",
            borderRadius: "999px",
            background:
              tip.accent === "violet"
                ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                : tip.accent === "pink"
                  ? "linear-gradient(135deg, #ec4899, #f97316)"
                  : "linear-gradient(135deg, #06b6d4, #10b981)",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              background: "#161129",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            👤
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {tip.user}
          </div>

          <div
            style={{
              marginTop: "4px",
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.65)",
            }}
          >
            {tip.time}
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "0.005em",
          color: "#6d4cff",
          whiteSpace: "nowrap",
        }}
      >
        {tip.amount}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  onManage,
}: {
  course: CourseCardItem;
  onManage: () => void;
}): JSX.Element {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.04)",
        boxShadow: "0 18px 55px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
        }}
      >
        <img
          src={course.image}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(25,20,47,0.75), rgba(25,20,47,0.1), transparent)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "16px",
            left: "22px",
            padding: "8px",
            borderRadius: "10px",
            background: "#141126",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {course.level}
        </span>
      </div>

      <div style={{ padding: "10px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {course.title}
        </h3>
        <div
          style={{
            marginTop: "4px",
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.48)",
            fontSize: "14px",
            padding: "1px",
          }}
        >
          <div>⇢ {course.students} students</div>
          <div>◔ {course.duration}</div>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              flex: 1,
              border: "none",
              borderRadius: "18px",
              padding: "16px 18px",
              background: "rgba(109,76,255,0.12)",
              color: "#6d4cff",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={onManage}
          >
            Manage Course
          </button>
          <button
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ⤴
          </button>
        </div>
      </div>
    </div>
  );
}