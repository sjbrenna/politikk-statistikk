import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  mode?: string;
  centered?: boolean;
  header?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function ContentCard({
  children,
  mode = "vertical",
  header,
  centered = false,
  className,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "flex bg-card-foreground border-2 border-card-border rounded-2xl p-4 w-[90%]",
        mode === "vertical" && "flex-col gap-y-4",
        mode === "horizontal" && "flex-row gap-x-4 flex-wrap gap-y-4",
        centered && "items-center",
        className,
      )}
      onClick={onClick}
    >
      {header && (
        <div className="w-full border-b-2 pb-2 subTitle">{header}</div>
      )}
      {children}
    </div>
  );
}

export default ContentCard;
