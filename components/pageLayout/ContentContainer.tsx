function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full items-center gap-y-4">
      {children}
    </div>
  );
}

export default ContentContainer;
