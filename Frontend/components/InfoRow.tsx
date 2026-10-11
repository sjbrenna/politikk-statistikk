type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function InfoRow({ icon, children }: Props) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      {icon}

      <div className="text-2xl min-w-0 wrap-break-word">{children}</div>
    </div>
  );
}

export default InfoRow;
