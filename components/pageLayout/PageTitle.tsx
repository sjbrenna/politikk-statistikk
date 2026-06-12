type Props = {
  title: String;
};

function PageTitle({ title }: Props) {
  console.log(title);
  return (
    <div className="flex min-h-16 lg:h-24 h-fit items-center rounded-b-xl bg-primary font-semibold text-3xl w-1/2 justify-center text-white">
      {title}
    </div>
  );
}

export default PageTitle;
