import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  children: React.ReactNode;
  className?: string;
  url?: string;
};

export function BrowserFrame({ children, className, url }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-kasi-border bg-[#0d0d0d]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-kasi-border px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-kasi-border" />
        <span className="h-2 w-2 rounded-full bg-kasi-border" />
        <span className="h-2 w-2 rounded-full bg-kasi-border" />
        {url && (
          <span className="ml-2 truncate font-mono text-[10px] tracking-[0.08em] text-kasi-grey">
            {url}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
