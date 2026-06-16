type Props = {
  children: React.ReactNode;
};

function ContentCard({ children }: Props) {
  return (
    <div className="flex flex-col w-full bg-card-foreground lg:w-1/2 rounded-2xl outline-2 outline-popover">
      {children}
    </div>
  );
}

export default ContentCard;
