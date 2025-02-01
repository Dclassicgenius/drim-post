"use client";

import React, { Children, ReactElement, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
interface TabProps {
  title: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-6">
      <div className="flex space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        {Children.map(children, (child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium",
              activeTab === index
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            )}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-800">
        {Children.map(children, (child, index) => (
          <div key={index} className={activeTab === index ? "block" : "hidden"}>
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
