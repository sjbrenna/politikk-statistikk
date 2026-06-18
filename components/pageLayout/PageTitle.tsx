type Props = {
  title: String;
};

function PageTitle({ title }: Props) {
  return (
    <div
      className="flex flex-wrap 
      min-h-16 lg:min-h-24 h-fit 
      items-center rounded-b-xl bg-primary font-semibold text-3xl w-1/2 justify-center text-white break-all
    p-2"
    >
      {title}
    </div>
  );
}

export default PageTitle;
