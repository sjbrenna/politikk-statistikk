import { ReactNode } from "react";

type Props = {
  title: String;
  children?: ReactNode;
  header?: React.ReactNode;
};

function PageTitle({ title, children, header }: Props) {
  return (
    <div
      className="
        flex flex-col
        min-h-16 lg:min-h-24 h-fit w-full
        rounded-b-xl bg-primary
        justify-center p-4 gap-y-6 text-primary-foreground
      "
    >
      {header ? (
        header
      ) : (
        <p
          className="text-3xl font-semibold wrap-break-word min-w-0
      "
        >
          {title}
        </p>
      )}

      {children}
    </div>
  );
}

export default PageTitle;
