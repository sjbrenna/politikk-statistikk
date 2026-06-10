type Props = {
  title: String;
};

function PageTitle({ title }: Props) {
  console.log(title);
  return (
    <div className="flex min-h-24 h-fit items-center rounded-l-2xl rounded-r-2xl bg-accent w-1/2 justify-center">
      {title}
    </div>
  );
}

export default PageTitle;
