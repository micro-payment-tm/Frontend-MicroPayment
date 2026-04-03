export function CourseLecture({
  title,
  description,
  duration,
  index,
  isCompleted = false,
  isActive = false,
  onClick,
}: {
  title: string;
  description: string;
  duration?: string;
  index?: number;
  isCompleted?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "8px",
        cursor: onClick ? "pointer" : "default",
        background: isActive ? "#f0f4ff" : "transparent",
        border: `1px solid ${isActive ? "#c7d4f8" : "#e8e8e8"}`,
        transition: "all 0.15s ease",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isCompleted
            ? "#22c55e"
            : isActive
              ? "#4f6ef7"
              : "#f0f0f0",
          color: isCompleted || isActive ? "#fff" : "#999",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        {isCompleted ? "✓" : (index ?? "▶")}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 600,
            color: isActive ? "#2d3be0" : "#1a1a1a",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: "12px",
            color: "#888",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>

      {/* Duration */}
      {duration && (
        <span
          style={{
            fontSize: "11px",
            color: "#aaa",
            flexShrink: 0,
            paddingTop: "2px",
          }}
        >
          {duration}
        </span>
      )}
    </div>
  );
}
