"use client";

import { Loader2, SearchIcon, Trash } from "lucide-react";
import { useRef, useEffect, useState } from "react";
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
import { createSearchIndex } from "@/lib/fuse-search";
import { getTagsWithGradient } from "@/lib/utils";
import TagList from "../Tags/TagList";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchIndex = useRef(createSearchIndex(posts));
  const inputRef = useRef<HTMLInputElement>(null);
  const initialLoadDone = useRef(false);
  const isLoading = useRef(false);

  const { push, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const results =
    query.length > 2
      ? searchIndex.current.search(query).map((result) => result.item)
      : [];

  const updateSearchParams = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
    isLoading.current = false;
  }, 300);

  useEffect(() => {
    if (!initialLoadDone.current && query) {
      initialLoadDone.current = true;
      setIsModalOpen(true);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      setIsModalOpen(true);
    }
  }, [query]);

  const handleChange = (term: string) => {
    isLoading.current = true;
    updateSearchParams(term);
  };

  const clearSearch = () => {
    updateSearchParams("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleItemClick = (slug: string) => {
    push(`/${slug}`);
    setIsModalOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Sheet open={isModalOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => handleOpenChange(true)}
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

        <div className="grid gap-4 py-4 relative max-w-3xl container mx-auto">
          <div className="relative">
            <Input
              autoFocus
              ref={inputRef}
              defaultValue={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search..."
              className="w-full px-8"
            />
            <SearchIcon className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isLoading.current && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {query && !isLoading.current && (
                <Trash
                  className="h-4 w-4 cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <ul className=" bg-background border rounded-md overflow-auto max-h-[60vh]">
              {results.map((post) => (
                <li
                  key={post.slug}
                  className="w-full text-left px-4 py-2 hover:bg-muted/50 group"
                >
                  <h3 className="font-bold hover:underline hover:decoration-purple-600">
                    <button
                      onClick={() => handleItemClick(post.slug)}
                      className="hover:underline"
                    >
                      {post.title}
                    </button>
                  </h3>
                  <div className="my-1" onClick={() => setIsModalOpen(false)}>
                    <TagList
                      tags={getTagsWithGradient(post.tags)}
                      classname="text-xs p-0.5"
                    />
                  </div>
                  {post.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !isLoading.current &&
            query.length > 2 && (
              <p className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md overflow-auto p-4">
                <span className="font-semibold">No results. </span>
                Sorry, this doesn&apos;t appear to be something I&apos;ve
                written about!
              </p>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Search;
