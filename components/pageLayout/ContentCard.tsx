type Props = {
  children: React.ReactNode;
  mode?: string;
  centered?: boolean;
  header?: React.ReactNode;
};

function ContentCard({
  children,
  mode = "vertical",
  header,
  centered = false,
}: Props) {
  return (
    <div
      className={`flex ${mode === "vertical" && "flex-col gap-y-4"} ${mode === "horizontal" && "flex-row gap-x-4 flex-wrap gap-y-4"}  bg-card-foreground border-2 
      border-card-border rounded-2xl
      ${centered && "items-center"}
    p-4 w-[90%]`}
    >
      {header && (
        <div className="w-full border-b-2 pb-2 subTitle">{header}</div>
      )}
      {children}
    </div>
  );
}

export default ContentCard;
