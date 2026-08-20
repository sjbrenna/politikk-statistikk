export type ContentContainerMode = "full" | "half";

type Props = {
  children: React.ReactNode;
  mode: ContentContainerMode;
  className?: string;
};

function ContentContainer({ children, mode, className }: Props) {
  return (
    <div
      className={`flex flex-col h-full items-center gap-y-4 ${className ?? ""}
                ${mode === "half" ? "w-1/2 mx-auto" : "w-full"}`}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
