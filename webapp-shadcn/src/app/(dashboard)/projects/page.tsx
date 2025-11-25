"use client";

import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for projects
const projects = [
  {
    id: "1",
    name: "Mobile App",
    description: "iOS and Android mobile application",
    locales: ["en", "es", "fr", "de"],
    termsCount: 245,
    translatedPercentage: 87,
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Web Dashboard",
    description: "Admin dashboard for the main platform",
    locales: ["en", "es", "pt"],
    termsCount: 182,
    translatedPercentage: 95,
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Marketing Website",
    description: "Public marketing and landing pages",
    locales: ["en", "es", "fr", "de", "ja", "zh"],
    termsCount: 89,
    translatedPercentage: 62,
    updatedAt: "2024-01-12",
  },
  {
    id: "4",
    name: "Email Templates",
    description: "Transactional and marketing emails",
    locales: ["en", "es"],
    termsCount: 56,
    translatedPercentage: 100,
    updatedAt: "2024-01-10",
  },
];

function getLocaleFlag(locale: string) {
  const flags: Record<string, string> = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    pt: "🇵🇹",
    ja: "🇯🇵",
    zh: "🇨🇳",
  };
  return flags[locale] || "🌐";
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState("");
  const [newProjectDescription, setNewProjectDescription] = React.useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    // Handle project creation - replace with actual API call
    console.log("Creating project:", { newProjectName, newProjectDescription });
    setIsCreateDialogOpen(false);
    setNewProjectName("");
    setNewProjectDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your translation projects
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new project</DialogTitle>
              <DialogDescription>
                Add a new translation project to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project name</Label>
                <Input
                  id="name"
                  placeholder="My Project"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="A brief description of your project"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={!newProjectName}>
                Create project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects grid */}
      {filteredProjects.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <Icons.folder className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query"
              : "Get started by creating a new project"}
          </p>
          {!searchQuery && (
            <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              <Icons.plus className="mr-2 h-4 w-4" />
              Create your first project
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Locales */}
                  <div className="flex flex-wrap gap-1">
                    {project.locales.slice(0, 4).map((locale) => (
                      <Badge key={locale} variant="secondary" className="text-xs">
                        {getLocaleFlag(locale)} {locale.toUpperCase()}
                      </Badge>
                    ))}
                    {project.locales.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.locales.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {project.termsCount} terms
                      </span>
                      <span className="font-medium">
                        {project.translatedPercentage}% translated
                      </span>
                    </div>
                    <Progress value={project.translatedPercentage} className="h-2" />
                  </div>

                  {/* Updated */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icons.clock className="h-3 w-3" />
                    Updated {project.updatedAt}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
