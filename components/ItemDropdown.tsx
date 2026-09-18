"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";

type Props = {
  items: string[];
  selectedItem: string;
  handleItemChange: React.Dispatch<React.SetStateAction<string>>;
};

function ItemDropdown({ items, selectedItem, handleItemChange }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-background border 
          border-accent overflow-hidden w-full 
           whitespace-nowrap h-10 text-foreground
           flex flex-row hover:bg-muted-foreground flex-1
          "
        >
          {selectedItem}
          {open ? <ArrowDown /> : <ArrowRight />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, i) => {
          return (
            <DropdownMenuItem
              key={i}
              className="border-b group hover:bg-div-hover"
              onClick={() => {
                handleItemChange(item);
              }}
            >
              <p
                className="wrap-break-word text-xl
              text-foreground group-hover:text-link-hover"
              >
                {item}
              </p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ItemDropdown;
