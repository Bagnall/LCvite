import { cn } from "@/lib/utils";

type IconProps = {
  src: string;
  className?: string;
  label?: string;
};

export function Icon({ src, className, label }: IconProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className={cn("icon inline-block", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        backgroundColor: "currentColor",
      }}
    />
  );
}
