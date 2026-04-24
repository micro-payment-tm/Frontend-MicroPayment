"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Physics");
  const [level, setLevel] = useState("BEGINNER");
  const [price, setPrice] = useState("0.25");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  const handleCreateCourse = (): void => {
    if (!title.trim()) {
      alert("Course title is required.");
      return;
    }

    // sementara masih dummy / frontend only
    // nanti bisa diganti POST ke API / database
    alert(`Course "${title}" created as ${status}.`);

    // simulasi redirect ke halaman courses
    router.push("/creator/courses");
  };

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
              <span style={chip}>Course Builder</span>
              <span style={chip}>New Product</span>
              <span style={chip}>Draft Setup</span>
            </div>

            <h1
              style={{
                margin: "16px 0 0 0",
                fontSize: "36px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              Create New Course
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
              Define the fundamental identity of your course before building the
              curriculum, publishing lessons, and enrolling students.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={secondaryBtn}
              onClick={() => router.push("/creator/courses")}
            >
              Cancel
            </button>
            <button style={primaryBtn} onClick={handleCreateCourse}>
              Create Course
            </button>
          </div>
        </div>
      </section>

      {/* MAIN FORM */}
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
        <div style={{ ...panel, padding: "18px" }}>
          <h2 style={{ margin: 0, fontSize: "28px" }}>Course Information</h2>

          <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
            <div>
              <div style={labelStyle}>Course Title</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
                placeholder="e.g. Advanced Robotics Systems"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={labelStyle}>Category</div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Physics">Physics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </div>

              <div>
                <div style={labelStyle}>Level</div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  style={inputStyle}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={labelStyle}>Price (ETH)</div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={inputStyle}
                  placeholder="0.25"
                />
              </div>

              <div>
                <div style={labelStyle}>Initial Status</div>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "Draft" | "Published")
                  }
                  style={inputStyle}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <div style={labelStyle}>Thumbnail URL</div>
              <input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                style={inputStyle}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <div style={labelStyle}>Description</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                style={textAreaStyle}
                placeholder="Describe the learning outcomes, audience, and scope of the course."
              />
            </div>
          </div>

          <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={primaryBtn} onClick={handleCreateCourse}>
              Save & Create
            </button>
            <button style={secondaryBtn}>Save as Draft</button>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Preview Summary</h3>

            <MiniStat label="Title" value={title || "Untitled Course"} />
            <MiniStat label="Category" value={category} />
            <MiniStat label="Level" value={level} />
            <MiniStat label="Price" value={`${price || "0.00"} ETH`} />
            <MiniStat label="Status" value={status} />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>💡 Tips</h3>

            <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
              <TipItem
                title="Start With a Strong Title"
                desc="A precise and specific title improves discoverability and conversion."
              />
              <TipItem
                title="Keep Description Outcome-Focused"
                desc="State what learners will achieve after completing the course."
              />
              <TipItem
                title="Use Draft First"
                desc="Publish only after the curriculum and preview lessons are ready."
              />
            </div>
          </div>
        </div>
      </section>
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