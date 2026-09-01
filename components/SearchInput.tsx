import { Input } from "./ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="placeholder:text-foreground border 
              border-accent w-full lg:flex-2
          bg-background lg:min-h-10 min-h-10
        "
    />
  );
}

export default SearchInput;
