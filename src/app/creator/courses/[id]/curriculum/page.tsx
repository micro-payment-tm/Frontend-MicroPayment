"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

type LessonType = "video" | "article" | "quiz" | "resource";

type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  freePreview: boolean;
  locked: boolean;
  contentUrl?: string;
  description: string;
};

type SectionItem = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type CourseMeta = {
  id: string;
  title: string;
  category: string;
  level: string;
  status: "Draft" | "Published";
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

const initialSectionsByCourse: Record<string, SectionItem[]> = {
  "1": [
    {
      id: "section-1",
      title: "Introduction to Entanglement",
      description: "Foundational concepts before entering mathematical formalism.",
      lessons: [
        {
          id: "lesson-1",
          title: "Welcome and Course Roadmap",
          type: "video",
          duration: "08:15",
          freePreview: true,
          locked: false,
          contentUrl: "https://example.com/welcome",
          description:
            "Overview of the learning path, structure, and expected outcomes.",
        },
        {
          id: "lesson-2",
          title: "What is Quantum Entanglement?",
          type: "article",
          duration: "06 min read",
          freePreview: true,
          locked: false,
          contentUrl: "https://example.com/entanglement-overview",
          description:
            "Conceptual explanation of quantum entanglement and why it matters.",
        },
      ],
    },
    {
      id: "section-2",
      title: "Mathematical Foundations",
      description: "Vectors, operators, and core formal representation.",
      lessons: [
        {
          id: "lesson-3",
          title: "Tensor Products and Composite Systems",
          type: "video",
          duration: "18:42",
          freePreview: false,
          locked: true,
          contentUrl: "https://example.com/tensor-products",
          description:
            "Covers the tensor product framework for multipartite systems.",
        },
      ],
    },
  ],
  "2": [
    {
      id: "section-1",
      title: "Basic Particle Concepts",
      description: "Beginner introduction to particle structure and interactions.",
      lessons: [
        {
          id: "lesson-1",
          title: "What is a Particle?",
          type: "video",
          duration: "09:20",
          freePreview: true,
          locked: false,
          contentUrl: "",
          description: "Foundational introduction to particles in modern physics.",
        },
      ],
    },
  ],
  "3": [
    {
      id: "section-1",
      title: "Special Relativity Basics",
      description: "Introductory section on spacetime and inertial frames.",
      lessons: [
        {
          id: "lesson-1",
          title: "Why Relativity Was Needed",
          type: "video",
          duration: "10:05",
          freePreview: true,
          locked: false,
          contentUrl: "",
          description:
            "Explains the classical limitations that motivated relativity.",
        },
        {
          id: "lesson-2",
          title: "Postulates of Special Relativity",
          type: "article",
          duration: "08 min read",
          freePreview: false,
          locked: true,
          contentUrl: "",
          description:
            "Covers the two core postulates that define special relativity.",
        },
      ],
    },
    {
      id: "section-2",
      title: "General Relativity Overview",
      description: "Curvature, gravity, and spacetime interpretation.",
      lessons: [
        {
          id: "lesson-3",
          title: "From Gravity to Curved Spacetime",
          type: "video",
          duration: "21:30",
          freePreview: false,
          locked: true,
          contentUrl: "",
          description:
            "Introduces the shift from force-based to curvature-based gravity.",
        },
      ],
    },
  ],
};

function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function getLessonIcon(type: LessonType): string {
  switch (type) {
    case "video":
      return "▶";
    case "article":
      return "≣";
    case "quiz":
      return "?";
    case "resource":
      return "⇣";
    default:
      return "•";
  }
}

function getLessonColor(type: LessonType): string {
  switch (type) {
    case "video":
      return "#8b5cf6";
    case "article":
      return "#06b6d4";
    case "quiz":
      return "#f59e0b";
    case "resource":
      return "#10b981";
    default:
      return "#6d4cff";
  }
}

export default function Page(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params.id) ? params.id[0] ?? "" : params.id ?? "";

  const course = useMemo(
    () => courseMetaList.find((item) => item.id === courseId),
    [courseId]
  );

  const courseSections = initialSectionsByCourse[courseId] ?? [];

  const [sections, setSections] = useState<SectionItem[]>(courseSections);

  const initialSectionId = courseSections[0]?.id ?? "";
  const initialLessonId = courseSections[0]?.lessons[0]?.id ?? "";

  const [selectedSectionId, setSelectedSectionId] =
    useState<string>(initialSectionId);
  const [selectedLessonId, setSelectedLessonId] =
    useState<string>(initialLessonId);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) ?? null,
    [sections, selectedSectionId]
  );

  const selectedLesson = useMemo(
    () =>
      sections
        .flatMap((section) => section.lessons)
        .find((lesson) => lesson.id === selectedLessonId) ?? null,
    [sections, selectedLessonId]
  );

  const totalLessons = useMemo(
    () => sections.reduce((acc, section) => acc + section.lessons.length, 0),
    [sections]
  );

  const previewCount = useMemo(
    () =>
      sections
        .flatMap((section) => section.lessons)
        .filter((lesson) => lesson.freePreview).length,
    [sections]
  );

  if (!course) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        <h1 style={{ margin: 0, fontSize: "30px" }}>Course Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          The requested curriculum cannot be loaded.
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

  const handleAddSection = (): void => {
    const newSection: SectionItem = {
      id: makeId("section"),
      title: `New Section ${sections.length + 1}`,
      description: "Describe the learning outcome of this section.",
      lessons: [],
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedSectionId(newSection.id);
    setSelectedLessonId("");
  };

  const handleAddLesson = (sectionId: string): void => {
    const newLesson: Lesson = {
      id: makeId("lesson"),
      title: "New Lesson",
      type: "video",
      duration: "00:00",
      freePreview: false,
      locked: true,
      contentUrl: "",
      description: "Write the lesson summary here.",
    };

    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      )
    );

    setSelectedSectionId(sectionId);
    setSelectedLessonId(newLesson.id);
  };

  const updateSelectedSection = (patch: Partial<SectionItem>): void => {
    if (!selectedSection) return;

    setSections((prev) =>
      prev.map((section) =>
        section.id === selectedSection.id ? { ...section, ...patch } : section
      )
    );
  };

  const updateSelectedLesson = (patch: Partial<Lesson>): void => {
    if (!selectedLesson) return;

    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) =>
          lesson.id === selectedLesson.id ? { ...lesson, ...patch } : lesson
        ),
      }))
    );
  };

  const moveSection = (sectionId: string, direction: "up" | "down"): void => {
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === sectionId);
      if (index === -1) return prev;

      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;

      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const moveLesson = (
    sectionId: string,
    lessonId: string,
    direction: "up" | "down"
  ): void => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const index = section.lessons.findIndex((l) => l.id === lessonId);
        if (index === -1) return section;

        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= section.lessons.length) return section;

        const nextLessons = [...section.lessons];
        [nextLessons[index], nextLessons[target]] = [
          nextLessons[target],
          nextLessons[index],
        ];

        return { ...section, lessons: nextLessons };
      })
    );
  };

  const deleteLesson = (lessonId: string): void => {
    const remainingLessons = sections.flatMap((section) => section.lessons);
    if (remainingLessons.length <= 1) return;

    const nextSections = sections.map((section) => ({
      ...section,
      lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
    }));

    setSections(nextSections);

    const fallbackLesson = nextSections.flatMap((section) => section.lessons)[0];
    if (fallbackLesson) {
      setSelectedLessonId(fallbackLesson.id);
      const ownerSection = nextSections.find((section) =>
        section.lessons.some((lesson) => lesson.id === fallbackLesson.id)
      );
      if (ownerSection) setSelectedSectionId(ownerSection.id);
    }
  };

  const storageKey = `curriculum_${courseId}`;

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed: SectionItem[] = JSON.parse(saved);
        setSections(parsed);
      } catch (error) {
        console.error("Failed to parse saved curriculum:", error);
      }
    }

    setHasLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hasLoaded) return;

    setSaveStatus("saving");

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(sections));
        setSaveStatus("saved");
      } catch (error) {
        console.error("Failed to save curriculum:", error);
        setSaveStatus("idle");
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [sections, storageKey, hasLoaded]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ): void => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <Toast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
      <div
        style={{ padding: "12px", color: "#fff" }}>
        {/* Header */}
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
            <div style={{ maxWidth: "820px" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span style={chip}>{course.category}</span>
                <span style={chip}>{course.level}</span>
                <span style={statusChip(course.status)}>{course.status}</span>
                <span style={chip}>Curriculum Builder</span>
              </div>

              <h1
                style={{
                  margin: "16px 0 0 0",
                  fontSize: "36px",
                  lineHeight: 1.15,
                  color: "rgba(255,255,255,0.96)",
                }}
              >
                {course.title} — My Curriculum
              </h1>

              <p
                style={{
                  marginTop: "14px",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                Organize sections, define lessons, and control preview access for
                each piece of learning content.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span
                style={{
                  borderRadius: "999px",
                  padding: "8px 12px",
                  background:
                    saveStatus === "saving"
                      ? "rgba(245,158,11,0.16)"
                      : saveStatus === "saved"
                        ? "rgba(16,185,129,0.16)"
                        : "rgba(255,255,255,0.06)",
                  color:
                    saveStatus === "saving"
                      ? "#fbbf24"
                      : saveStatus === "saved"
                        ? "#34d399"
                        : "rgba(255,255,255,0.72)",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "saved"
                    ? "Saved"
                    : "Idle"}
              </span>

              <button
                style={secondaryBtn}
                onClick={() => router.push(`/creator/courses/${course.id}`)}
              >
                Back
              </button>

              <button style={secondaryBtn}>Preview</button>

              <button
                style={primaryBtn}
                onClick={() => {
                  try {
                    localStorage.setItem(storageKey, JSON.stringify(sections));
                    setSaveStatus("saved");
                    showNotification("Curriculum berhasil disimpan.", "success");
                  } catch (error) {
                    showNotification("Gagal menyimpan curriculum.", "error");
                  }
                }}
              >
                Save Curriculum
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
            <StatCard label="Sections" value={String(sections.length)} />
            <StatCard label="Lessons" value={String(totalLessons)} />
            <StatCard label="Preview" value={String(previewCount)} accent />
            <StatCard label="Status" value={course.status} />
          </div>
        </section>

        {/* Main */}
        <section
          style={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(340px, 0.75fr)",
            gap: "14px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div style={{ ...panel, padding: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "28px" }}>Curriculum Structure</h2>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                  }}
                >
                  Build the flow of your course using sections and lessons.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button style={softBtn} onClick={handleAddSection}>
                  + Add Section
                </button>
                <button
                  style={softBtn}
                  onClick={() =>
                    selectedSectionId ? handleAddLesson(selectedSectionId) : undefined
                  }
                >
                  + Add Lesson
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {sections.map((section, sectionIndex) => {
                const activeSection = section.id === selectedSectionId;

                return (
                  <div
                    key={section.id}
                    style={{
                      borderRadius: "20px",
                      border: activeSection
                        ? "1px solid rgba(109,76,255,0.26)"
                        : "1px solid rgba(255,255,255,0.06)",
                      background: activeSection
                        ? "rgba(109,76,255,0.06)"
                        : "rgba(255,255,255,0.025)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 18px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "14px",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{ cursor: "pointer", flex: 1, minWidth: 0 }}
                        onClick={() => {
                          setSelectedSectionId(section.id);
                          if (section.lessons[0]) {
                            setSelectedLessonId(section.lessons[0].id);
                          } else {
                            setSelectedLessonId("");
                          }
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "12px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(109,76,255,0.12)",
                              color: "#a78bfa",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {sectionIndex + 1}
                          </span>

                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "rgba(255,255,255,0.94)",
                              }}
                            >
                              {section.title}
                            </div>
                            <div
                              style={{
                                marginTop: "6px",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.5)",
                              }}
                            >
                              {section.description}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap"
                      }}
                      >
                        <span
                          style={pill}>{section.lessons.length}
                          lessons
                        </span>
                        <button
                          style={iconMiniBtn}
                          onClick={() => moveSection(section.id, "up")}
                        >
                          ↑
                        </button>
                        <button
                          style={iconMiniBtn}
                          onClick={() => moveSection(section.id, "down")}
                        >
                          ↓
                        </button>
                        <button
                          style={miniBtn}
                          onClick={() => handleAddLesson(section.id)}
                        >
                          + Lesson
                        </button>
                      </div>
                    </div>

                    <div style={{ padding: "14px" }}>
                      {section.lessons.length === 0 ? (
                        <div
                          style={{
                            borderRadius: "16px",
                            border: "1px dashed rgba(255,255,255,0.12)",
                            padding: "16px",
                            color: "rgba(255,255,255,0.42)",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          No lessons yet. Add a lesson to start building this section.
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {section.lessons.map((lesson, lessonIndex) => {
                            const selected = lesson.id === selectedLessonId;
                            const accent = getLessonColor(lesson.type);

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => {
                                  setSelectedSectionId(section.id);
                                  setSelectedLessonId(lesson.id);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    setSelectedSectionId(section.id);
                                    setSelectedLessonId(lesson.id);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  border: selected
                                    ? `1px solid ${accent}55`
                                    : "1px solid rgba(255,255,255,0.06)",
                                  background: selected
                                    ? "rgba(255,255,255,0.055)"
                                    : "rgba(255,255,255,0.025)",
                                  borderRadius: "18px",
                                  padding: "14px 16px",
                                  cursor: "pointer",
                                  color: "#fff",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "12px",
                                      minWidth: 0,
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "12px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `${accent}22`,
                                        color: accent,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {getLessonIcon(lesson.type)}
                                    </span>

                                    <div style={{ minWidth: 0 }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "10px",
                                          flexWrap: "wrap",
                                          alignItems: "center",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "15px",
                                            fontWeight: 700,
                                            color: "rgba(255,255,255,0.94)",
                                          }}
                                        >
                                          {lessonIndex + 1}. {lesson.title}
                                        </span>

                                        <span
                                          style={{
                                            borderRadius: "999px",
                                            background: `${accent}18`,
                                            color: accent,
                                            padding: "4px 10px",
                                            fontSize: "11px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.12em",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {lesson.type}
                                        </span>

                                        {lesson.freePreview && <span style={pill}>Preview</span>}
                                        {!lesson.locked && <span style={pill}>Unlocked</span>}
                                      </div>

                                      <div
                                        style={{
                                          marginTop: "6px",
                                          fontSize: "13px",
                                          color: "rgba(255,255,255,0.5)",
                                        }}
                                      >
                                        {lesson.duration} • {lesson.description}
                                      </div>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <button
                                      type="button"
                                      style={iconMiniBtn}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveLesson(section.id, lesson.id, "up");
                                      }}
                                    >
                                      ↑
                                    </button>
                                    <button
                                      type="button"
                                      style={iconMiniBtn}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveLesson(section.id, lesson.id, "down");
                                      }}
                                    >
                                      ↓
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ ...panel, padding: "18px" }}>
              <h3 style={{ margin: 0, fontSize: "24px" }}>Section Settings</h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  color: "rgba(255,255,255,0.48)",
                  fontSize: "13px",
                }}
              >
                Update the selected section title and learning description.
              </p>

              {selectedSection ? (
                <div style={{ marginTop: "18px", display: "grid", gap: "12px" }}>
                  <div>
                    <div style={labelStyle}>Section Title</div>
                    <input
                      value={selectedSection.title}
                      onChange={(e) =>
                        updateSelectedSection({ title: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <div style={labelStyle}>Section Description</div>
                    <textarea
                      value={selectedSection.description}
                      onChange={(e) =>
                        updateSelectedSection({ description: e.target.value })
                      }
                      rows={4}
                      style={textAreaStyle}
                    />
                  </div>
                </div>
              ) : (
                <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.5)" }}>
                  Select a section to edit its settings.
                </p>
              )}
            </div>

            <div style={{ ...panel, padding: "18px" }}>
              <h3 style={{ margin: 0, fontSize: "24px" }}>Lesson Editor</h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  color: "rgba(255,255,255,0.48)",
                  fontSize: "13px",
                }}
              >
                Adjust title, type, duration, access, and content reference.
              </p>

              {selectedLesson ? (
                <div style={{ marginTop: "18px", display: "grid", gap: "12px" }}>
                  <div>
                    <div style={labelStyle}>Lesson Title</div>
                    <input
                      value={selectedLesson.title}
                      onChange={(e) =>
                        updateSelectedLesson({ title: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <div style={labelStyle}>Lesson Type</div>
                      <select
                        value={selectedLesson.type}
                        onChange={(e) =>
                          updateSelectedLesson({
                            type: e.target.value as LessonType,
                          })
                        }
                        style={inputStyle}
                      >
                        <option value="video">Video</option>
                        <option value="article">Article</option>
                        <option value="quiz">Quiz</option>
                        <option value="resource">Resource</option>
                      </select>
                    </div>

                    <div>
                      <div style={labelStyle}>Duration / Meta</div>
                      <input
                        value={selectedLesson.duration}
                        onChange={(e) =>
                          updateSelectedLesson({ duration: e.target.value })
                        }
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={labelStyle}>Content URL / IPFS / Resource Link</div>
                    <input
                      value={selectedLesson.contentUrl ?? ""}
                      onChange={(e) =>
                        updateSelectedLesson({ contentUrl: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="https://... or ipfs://..."
                    />
                  </div>

                  <div>
                    <div style={labelStyle}>Lesson Description</div>
                    <textarea
                      value={selectedLesson.description}
                      onChange={(e) =>
                        updateSelectedLesson({ description: e.target.value })
                      }
                      rows={5}
                      style={textAreaStyle}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <button
                      style={toggleBtn(selectedLesson.freePreview, "#34d399")}
                      onClick={() =>
                        updateSelectedLesson({
                          freePreview: !selectedLesson.freePreview,
                        })
                      }
                    >
                      {selectedLesson.freePreview
                        ? "Free Preview Enabled"
                        : "Enable Free Preview"}
                    </button>

                    <button
                      style={toggleBtn(selectedLesson.locked, "#fbbf24")}
                      onClick={() =>
                        updateSelectedLesson({ locked: !selectedLesson.locked })
                      }
                    >
                      {selectedLesson.locked ? "Locked Lesson" : "Unlocked Lesson"}
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={primaryBtn}>Save Lesson</button>
                    <button
                      style={dangerBtn}
                      onClick={() => deleteLesson(selectedLesson.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.5)" }}>
                  Select a lesson to edit its details.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
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

const pill: React.CSSProperties = {
  borderRadius: "999px",
  padding: "4px 10px",
  background: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.8)",
  fontSize: "11px",
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

const softBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "14px",
  background: "rgba(109,76,255,0.10)",
  border: "1px solid rgba(109,76,255,0.20)",
  color: "#a78bfa",
  cursor: "pointer",
  fontWeight: 700,
};

const miniBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const iconMiniBtn: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
};

const dangerBtn: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "12px",
  background: "rgba(239,68,68,0.10)",
  color: "#fca5a5",
  border: "1px solid rgba(239,68,68,0.22)",
  cursor: "pointer",
  fontWeight: 700,
};

function toggleBtn(active: boolean, color: string): React.CSSProperties {
  return {
    padding: "14px 16px",
    borderRadius: "14px",
    background: active ? `${color}22` : "rgba(255,255,255,0.035)",
    color: active ? color : "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    fontWeight: 700,
  };
}