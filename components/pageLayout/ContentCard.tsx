type Props = {
  children: React.ReactNode;
  mode?: string;
};

function ContentCard({ children, mode = "vertical" }: Props) {
  return (
    <div
      className={`flex ${mode === "vertical" && "flex-col gap-y-4"} ${mode === "horizontal" && "flex-row gap-x-4"}  bg-card-foreground border-2 border-card-border rounded-2xl
    p-4 w-full `}
    >
      {children}
    </div>
  );
}

export default ContentCard;
