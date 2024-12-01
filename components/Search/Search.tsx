"use client";

import { SearchIcon, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const clearSearch = () => {
    handleChange("");
    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="w-10 px-0"
        >
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader className="max-w-3xl container mx-auto">
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Enter your query below.</SheetDescription>
        </SheetHeader>
        <form
          ref={formRef}
          className="grid gap-4 py-4 relative max-w-3xl container mx-auto"
        >
          <Input
            autoFocus
            ref={inputRef}
            onChange={(e) => handleChange(e.target.value)}
            defaultValue={searchParams.get("query") ?? ""}
            placeholder="Search..."
            className="w-full px-8 "
          />
          <SearchIcon className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
          {searchParams.get("query") && (
            <Trash
              className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={clearSearch}
            />
          )}
        </form>
        <SheetFooter className="max-w-3xl container mx-auto">
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Search;
