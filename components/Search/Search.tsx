"use client";

import { Loader2, SearchIcon, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { posts } from "#site/content";
import { createSearchIndex, SearchablePost } from "@/lib/fuse-search";
import Link from "next/link";
import { getTagsWithGradient } from "@/lib/utils";
import TagList from "../Tags/TagList";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchablePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchIndex = useRef(createSearchIndex(posts));

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const performSearch = useDebouncedCallback((term: string) => {
    if (term.length > 2) {
      const results = searchIndex.current
        .search(term)
        .map((result) => result.item);
      setResults(results);
    } else {
      setResults([]);
    }
    setIsLoading(false);
  }, 300);

  const handleChange = (term: string) => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      setIsLoading(false);
    }
    replace(`${pathname}?${params.toString()}`);

    performSearch(term);
  };

  const clearSearch = () => {
    handleChange("");
    formRef.current?.reset();
    inputRef.current?.focus();
    setResults([]);
    setIsLoading(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) clearSearch();
      }}
    >
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
          <SheetTitle>Search Posts</SheetTitle>
          <SheetDescription>Search through all posts.</SheetDescription>
        </SheetHeader>

        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 py-4 relative max-w-3xl container mx-auto"
        >
          <div className="relative">
            <Input
              autoFocus
              ref={inputRef}
              onChange={(e) => handleChange(e.target.value)}
              defaultValue={searchParams.get("query") ?? ""}
              placeholder="Search..."
              className="w-full px-8"
            />
            <SearchIcon className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {searchParams.get("query") && !isLoading && (
                <Trash
                  className="h-4 w-4 cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </div>
          </div>

          {results.length > 0 && searchParams.get("query") ? (
            <ul className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md overflow-auto">
              {results.map((post) => {
                const tagsWithGradient = getTagsWithGradient(post.tags);

                return (
                  <li key={post.slug}>
                    <Link
                      href={`/${post.slug}`}
                      className="block px-4 py-2 hover:bg-muted/50 group"
                      onClick={() => {
                        setOpen(false);
                        clearSearch();
                      }}
                    >
                      <h3 className="font-bold">{post.title}</h3>

                      <div className="my-1 relative z-10">
                        <TagList
                          tags={tagsWithGradient}
                          classname="text-xs p-0.5 relative z-10"
                        />
                      </div>
                      {post.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                          {post.description}
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            !isLoading &&
            searchParams.get("query") && (
              <p className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md overflow-auto p-4">
                <span className="font-semibold">No results. </span>Sorry, this
                doesn&apos;t appear to be something I&apos;ve written about!
              </p>
            )
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Search;
