"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
type LocaleCode = "en" | "es" | "fr" | "de";
type Translations = Record<LocaleCode, string>;

interface Term {
  id: string;
  key: string;
  translations: Translations;
  labels: string[];
}

// Mock project data
const projectData = {
  id: "1",
  name: "Mobile App",
  description: "iOS and Android mobile application",
  locales: [
    { code: "en" as LocaleCode, name: "English", isBase: true, translatedCount: 245, totalCount: 245 },
    { code: "es" as LocaleCode, name: "Spanish", isBase: false, translatedCount: 220, totalCount: 245 },
    { code: "fr" as LocaleCode, name: "French", isBase: false, translatedCount: 195, totalCount: 245 },
    { code: "de" as LocaleCode, name: "German", isBase: false, translatedCount: 230, totalCount: 245 },
  ],
  terms: [
    {
      id: "1",
      key: "common.welcome",
      translations: {
        en: "Welcome",
        es: "Bienvenido",
        fr: "Bienvenue",
        de: "Willkommen",
      } as Translations,
      labels: ["common"],
    },
    {
      id: "2",
      key: "common.login",
      translations: {
        en: "Log in",
        es: "Iniciar sesión",
        fr: "Se connecter",
        de: "Anmelden",
      } as Translations,
      labels: ["common", "auth"],
    },
    {
      id: "3",
      key: "common.logout",
      translations: {
        en: "Log out",
        es: "Cerrar sesión",
        fr: "Se déconnecter",
        de: "Abmelden",
      } as Translations,
      labels: ["common", "auth"],
    },
    {
      id: "4",
      key: "common.signup",
      translations: {
        en: "Sign up",
        es: "Registrarse",
        fr: "S'inscrire",
        de: "Registrieren",
      } as Translations,
      labels: ["common", "auth"],
    },
    {
      id: "5",
      key: "errors.network",
      translations: {
        en: "Network error. Please try again.",
        es: "Error de red. Por favor, inténtelo de nuevo.",
        fr: "",
        de: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
      } as Translations,
      labels: ["errors"],
    },
    {
      id: "6",
      key: "errors.server",
      translations: {
        en: "Server error. Please contact support.",
        es: "",
        fr: "",
        de: "",
      } as Translations,
      labels: ["errors"],
    },
  ] as Term[],
  labels: ["common", "auth", "errors", "settings", "profile"],
  teamMembers: [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
  ],
  apiClients: [
    { id: "1", name: "Production API", role: "viewer", createdAt: "2024-01-10" },
    { id: "2", name: "CI/CD Pipeline", role: "editor", createdAt: "2024-01-05" },
  ],
};

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

export default function ProjectDetailPage() {
  useParams(); // Used for future API calls
  const [selectedLocale, setSelectedLocale] = React.useState<LocaleCode>("es");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingTerm, setEditingTerm] = React.useState<string | null>(null);
  const [isAddTermDialogOpen, setIsAddTermDialogOpen] = React.useState(false);
  const [isAddLocaleDialogOpen, setIsAddLocaleDialogOpen] = React.useState(false);

  const filteredTerms = projectData.terms.filter(
    (term) =>
      term.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(term.translations).some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalProgress = Math.round(
    (projectData.locales.reduce((acc, l) => acc + l.translatedCount, 0) /
      projectData.locales.reduce((acc, l) => acc + l.totalCount, 0)) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <Icons.arrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {projectData.name}
            </h1>
            <p className="text-muted-foreground">{projectData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Icons.settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Terms</CardDescription>
            <CardTitle className="text-3xl">{projectData.terms.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Languages</CardDescription>
            <CardTitle className="text-3xl">{projectData.locales.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Team Members</CardDescription>
            <CardTitle className="text-3xl">{projectData.teamMembers.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall Progress</CardDescription>
            <CardTitle className="text-3xl">{totalProgress}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={totalProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="translations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="translations" className="gap-2">
            <Icons.languages className="h-4 w-4" />
            Translations
          </TabsTrigger>
          <TabsTrigger value="terms" className="gap-2">
            <Icons.file className="h-4 w-4" />
            Terms
          </TabsTrigger>
          <TabsTrigger value="labels" className="gap-2">
            <Icons.tag className="h-4 w-4" />
            Labels
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Icons.users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Icons.key className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Translations Tab */}
        <TabsContent value="translations" className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search terms or translations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedLocale} onValueChange={(value) => setSelectedLocale(value as LocaleCode)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectData.locales
                    .filter((l) => !l.isBase)
                    .map((locale) => (
                      <SelectItem key={locale.code} value={locale.code}>
                        {getLocaleFlag(locale.code)} {locale.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isAddLocaleDialogOpen} onOpenChange={setIsAddLocaleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a new language</DialogTitle>
                    <DialogDescription>
                      Add a new target language for translations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">🇮🇹 Italian</SelectItem>
                          <SelectItem value="nl">🇳🇱 Dutch</SelectItem>
                          <SelectItem value="pl">🇵🇱 Polish</SelectItem>
                          <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                          <SelectItem value="ko">🇰🇷 Korean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddLocaleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button>Add Language</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddTermDialogOpen} onOpenChange={setIsAddTermDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Add Term
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a new term</DialogTitle>
                    <DialogDescription>
                      Create a new translation key for your project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Key</Label>
                      <Input placeholder="e.g., common.button.save" />
                    </div>
                    <div className="space-y-2">
                      <Label>Base translation (English)</Label>
                      <Textarea placeholder="Enter the base translation" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddTermDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button>Add Term</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Languages progress */}
          <div className="flex flex-wrap gap-2">
            {projectData.locales.map((locale) => (
              <div
                key={locale.code}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
              >
                <span>{getLocaleFlag(locale.code)}</span>
                <span className="font-medium">{locale.code.toUpperCase()}</span>
                <span className="text-muted-foreground">
                  {Math.round((locale.translatedCount / locale.totalCount) * 100)}%
                </span>
                {locale.isBase && (
                  <Badge variant="secondary" className="text-xs">
                    Base
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Translations table */}
          <Card>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Key</TableHead>
                    <TableHead>English (Base)</TableHead>
                    <TableHead>
                      {getLocaleFlag(selectedLocale)}{" "}
                      {projectData.locales.find((l) => l.code === selectedLocale)?.name}
                    </TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTerms.map((term) => (
                    <TableRow key={term.id}>
                      <TableCell className="font-mono text-sm">
                        {term.key}
                        <div className="flex gap-1 mt-1">
                          {term.labels.map((label) => (
                            <Badge key={label} variant="outline" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {term.translations.en}
                      </TableCell>
                      <TableCell>
                        {editingTerm === term.id ? (
                          <div className="flex gap-2">
                            <Textarea
                              defaultValue={term.translations[selectedLocale] || ""}
                              className="min-h-[60px]"
                            />
                            <div className="flex flex-col gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setEditingTerm(null)}
                              >
                                <Icons.check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setEditingTerm(null)}
                              >
                                <Icons.close className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                            onClick={() => setEditingTerm(term.id)}
                          >
                            {term.translations[selectedLocale] || (
                              <span className="text-muted-foreground italic">
                                Click to translate...
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {term.translations[selectedLocale] ? (
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                            <Icons.checkCircle className="mr-1 h-3 w-3" />
                            Done
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
                            <Icons.alertCircle className="mr-1 h-3 w-3" />
                            Missing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Icons.moreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-md flex-1">
              <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search terms..." className="pl-10" />
            </div>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Add Term
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Labels</TableHead>
                  <TableHead>Translations</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectData.terms.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell className="font-mono">{term.key}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {term.labels.map((label) => (
                          <Badge key={label} variant="outline">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {Object.values(term.translations).filter(Boolean).length} /{" "}
                      {projectData.locales.length}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Icons.moreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Labels Tab */}
        <TabsContent value="labels" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Organize your terms with labels for better management.
            </p>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Add Label
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectData.labels.map((label) => (
              <Card key={label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">{label}</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Icons.moreVertical className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {projectData.terms.filter((t) => t.labels.includes(label)).length} terms
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Manage team members and their access levels.
            </p>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectData.teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={member.role === "Admin" ? "default" : "secondary"}
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Icons.moreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Manage API clients for programmatic access.
            </p>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Create API Client
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectData.apiClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{client.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {client.createdAt}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Icons.moreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
