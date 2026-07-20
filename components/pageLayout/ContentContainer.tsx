export type ContentContainerMode = "full" | "half";

function ContentContainer({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: ContentContainerMode;
}) {
  return (
    <div
      className={`flex flex-col h-full items-center gap-y-4 ${mode === "half" && "w-1/2 mx-auto"} ${mode === "full" && "w-full"}`}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
