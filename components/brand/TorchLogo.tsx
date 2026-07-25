interface TorchMarkProps {
  className?: string;
  label?: string;
}

export function TorchMark({ className, label }: TorchMarkProps) {
  return (
    <img
      src="/torchnova-logo-icon.svg"
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      className={className}
    />
  );
}

interface TorchWordmarkProps {
  className?: string;
  label?: string;
}

export function TorchWordmark({
  className,
  label = "TORCHNOVA",
}: TorchWordmarkProps) {
  return (
    <img
      src="/torchnova-logo-transparent.svg"
      alt={label}
      className={`torch-wordmark${className ? ` ${className}` : ""}`}
    />
  );
}
