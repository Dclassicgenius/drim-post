"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useState } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

export function Tabs({ tabs, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="my-6">
      <div className="flex space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        {tabs.map((tab, index) => (
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
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
