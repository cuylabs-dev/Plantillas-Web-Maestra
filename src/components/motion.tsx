import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "left" | "right" | "scale";
  as?: "div" | "section" | "article" | "li";
};

const VARIANT_CLASS = {
  up: "motion-up",
  fade: "motion-fade",
  left: "motion-left",
  right: "motion-right",
  scale: "motion-scale",
};

export function Motion({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as = "div",
}: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as;
  const style: CSSProperties = { transitionDelay: `${delay}ms` };

  return (
    <Tag
      ref={ref as never}
      className={`${VARIANT_CLASS[variant]} ${visible ? "motion-on" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

export function MotionStagger({
  children,
  className = "",
  staggerMs = 80,
}: {
  children: ReactNode[];
  className?: string;
  staggerMs?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Motion key={i} delay={i * staggerMs} variant="up">
          {child}
        </Motion>
      ))}
    </div>
  );
}

export function PageEnter({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
