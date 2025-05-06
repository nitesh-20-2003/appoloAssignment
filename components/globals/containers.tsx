import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl xl:max-w-8xl px-4", className)}>
      {children}
    </div>
  );
}

export default Container;
