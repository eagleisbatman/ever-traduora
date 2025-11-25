"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  {
    title: "Projects",
    href: "/projects",
    icon: Icons.folder,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.settings,
  },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-sidebar",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b px-4", isCollapsed && "justify-center")}>
        <Link href="/projects" className="flex items-center gap-2">
          <Icons.globe className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="text-lg font-semibold">Traduora</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const NavIcon = item.icon;

            if (isCollapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="icon"
                        className={cn(
                          "w-10 h-10",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        <NavIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  <NavIcon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Icons.logout className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Sign out</TooltipContent>
          </Tooltip>
        ) : (
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Icons.logout className="h-5 w-5" />
            Sign out
          </Button>
        )}
      </div>
    </div>
  );
}
