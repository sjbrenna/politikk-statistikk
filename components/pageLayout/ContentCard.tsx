type Props = {
  children: React.ReactNode;
};

function ContentCard({ children }: Props) {
  return (
    <div
      className="flex flex-col gap-y-4 bg-card-foreground border-2 border-card-border rounded-2xl
    p-4 w-full "
    >
      {children}
    </div>
  );
}

export default ContentCard;
