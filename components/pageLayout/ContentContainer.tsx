function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full items-center">{children}</div>
  );
}

export default ContentContainer;
