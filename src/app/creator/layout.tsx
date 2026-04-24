"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// @ts-ignore
import "@rainbow-me/rainbowkit/styles.css";

type MenuItem = {
  label: string;
  icon: string;
  href: string;
};

const menu: MenuItem[] = [
  { label: "Overview", icon: "▦", href: "/creator" },
  { label: "Courses", icon: "📖", href: "/creator/courses" },
  { label: "Students", icon: "👥", href: "/creator/students" },
  { label: "Assets", icon: "🪙", href: "/creator/assets" },
];

const iconButtonStyle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "rgba(255,255,255,0.75)",
  cursor: "pointer",
};

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top center, rgba(96,76,255,0.16), transparent 28%), radial-gradient(circle at 80% 12%, rgba(110,78,255,0.12), transparent 20%), #090617",
        color: "#fff",
      }}
    >
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: "80px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(12, 9, 27, 0.9)",
          backdropFilter: "blur(18px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#6d4cff",
              letterSpacing: "-0.02em",
            }}
          >
            MILEA
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              color: "rgba(255,255,255,0.65)",
              fontSize: "18px",
            }}
          >
            {["Dashboard", "Courses", "Analytics", "Community"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={iconButtonStyle}>🔔</button>
          <button style={iconButtonStyle}>⚙️</button>
          <div
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(95,71,255,0.35)",
            }}
          >
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="address"
            />
          </div>
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "260px minmax(0, 1fr)",
        }}
      >
        <aside
          style={{
            minHeight: "calc(100vh - 80px)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            padding: "22px 18px 20px",
            background: "rgba(17, 12, 48, 0.49)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "26px",
              padding: "0 10px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "999px",
                overflow: "hidden",
                border: "1px solid rgba(109,76,255,0.3)",
                boxShadow: "0 0 0 2px rgba(109,76,255,0.15)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
                alt="Creator"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#6d4cff",
                }}
              >
                Creator Hub
              </div>
              <div
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "4px",
                }}
              >
                Verified Instructor
              </div>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              border: "1px solid rgba(109,76,255,0.22)",
              background: "rgba(109,76,255,0.08)",
              color: "#6d4cff",
              fontSize: "16px",
              fontWeight: 700,
              borderRadius: "18px",
              padding: "16px 18px",
              cursor: "pointer",
              marginBottom: "30px",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
            }}
            onClick={() => router.push("/creator/courses/new")}
          >
            Create New Course
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {menu.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    width: "100%",
                    padding: "14px 16px",
                    textDecoration: "none",
                    background: isActive
                      ? "rgba(109,76,255,0.10)"
                      : "transparent",
                    color: isActive
                      ? "rgba(255,255,255,0.90)"
                      : "rgba(255,255,255,0.52)",
                    fontSize: "16px",
                    fontWeight: 500,
                    borderRadius: "0 20px 20px 0",
                    borderRight: isActive
                      ? "3px solid #6d4cff"
                      : "3px solid transparent",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      opacity: isActive ? 1 : 0.85,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "22px 12px 8px",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ?
            </span>
            <span>Support</span>
          </div>
        </aside>

        <div style={{ padding: "12px" }}>{children}</div>
      </div>
    </main>
  );
}