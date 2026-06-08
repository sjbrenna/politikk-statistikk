function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-full items-center bg-accent flex-1">
      {children}
    </div>
  );
}

export default ContentContainer;
