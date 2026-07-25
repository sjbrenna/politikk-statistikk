import { ReactNode } from "react";

type Props = {
  title: String;
  children?: ReactNode;
};

function PageTitle({ title, children }: Props) {
  return (
    <div
      className="
        flex flex-col
        min-h-16 lg:min-h-24 h-fit w-full
        rounded-b-xl bg-primary
        justify-center p-4 gap-y-6
      "
    >
      <p className="text-3xl font-semibold wrap-break-word min-w-0">{title}</p>

      {children}
    </div>
  );
}

export default PageTitle;
