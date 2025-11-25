"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const exportFormats = [
  { id: "json-flat", name: "JSON (Flat)", description: "Simple key-value pairs" },
  { id: "json-nested", name: "JSON (Nested)", description: "Nested object structure" },
  { id: "xliff", name: "XLIFF 1.2", description: "Industry standard format" },
  { id: "xliff2", name: "XLIFF 2.0", description: "Latest XLIFF version" },
  { id: "csv", name: "CSV", description: "Spreadsheet compatible" },
  { id: "yaml", name: "YAML", description: "Human-readable format" },
  { id: "properties", name: "Java Properties", description: "For Java applications" },
  { id: "gettext", name: "Gettext (.po)", description: "For C/Python apps" },
  { id: "strings", name: "iOS Strings", description: "For iOS development" },
  { id: "android", name: "Android XML", description: "For Android development" },
];

const locales = [
  { code: "en", name: "English", flag: "🇺🇸", isBase: true },
  { code: "es", name: "Spanish", flag: "🇪🇸", isBase: false },
  { code: "fr", name: "French", flag: "🇫🇷", isBase: false },
  { code: "de", name: "German", flag: "🇩🇪", isBase: false },
];

export default function ExportPage() {
  const params = useParams();
  const [selectedFormat, setSelectedFormat] = React.useState("json-flat");
  const [selectedLocales, setSelectedLocales] = React.useState<string[]>(["en"]);
  const [includeEmpty, setIncludeEmpty] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const toggleLocale = (code: string) => {
    setSelectedLocales((prev) =>
      prev.includes(code)
        ? prev.filter((l) => l !== code)
        : [...prev, code]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsExporting(false);
    // Trigger download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/projects/${params.projectId}`}>
          <Button variant="ghost" size="icon">
            <Icons.arrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Export Translations</h1>
          <p className="text-muted-foreground">
            Export your translations to various file formats
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Configure your export settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format selection */}
            <div className="space-y-2">
              <Label>File Format</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      <div className="flex flex-col">
                        <span>{format.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {format.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Language selection */}
            <div className="space-y-3">
              <Label>Languages to Export</Label>
              <div className="grid gap-2">
                {locales.map((locale) => (
                  <div
                    key={locale.code}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedLocales.includes(locale.code)}
                        onCheckedChange={() => toggleLocale(locale.code)}
                      />
                      <span className="text-lg">{locale.flag}</span>
                      <span>{locale.name}</span>
                      {locale.isBase && (
                        <Badge variant="secondary" className="text-xs">
                          Base
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {locale.code.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLocales(locales.map((l) => l.code))}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLocales([])}
                >
                  Deselect All
                </Button>
              </div>
            </div>

            <Separator />

            {/* Additional options */}
            <div className="space-y-3">
              <Label>Additional Options</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="include-empty"
                  checked={includeEmpty}
                  onCheckedChange={(checked) => setIncludeEmpty(checked as boolean)}
                />
                <Label htmlFor="include-empty" className="font-normal">
                  Include empty translations
                </Label>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={selectedLocales.length === 0 || isExporting}
              onClick={handleExport}
            >
              {isExporting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Icons.download className="mr-2 h-4 w-4" />
                  Export {selectedLocales.length} Language
                  {selectedLocales.length !== 1 ? "s" : ""}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Format info */}
        <Card>
          <CardHeader>
            <CardTitle>Format Preview</CardTitle>
            <CardDescription>
              Preview of the selected export format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4">
              <pre className="text-sm overflow-auto">
                {selectedFormat === "json-flat" && `{
  "common.welcome": "Welcome",
  "common.login": "Log in",
  "common.logout": "Log out"
}`}
                {selectedFormat === "json-nested" && `{
  "common": {
    "welcome": "Welcome",
    "login": "Log in",
    "logout": "Log out"
  }
}`}
                {selectedFormat === "yaml" && `common:
  welcome: Welcome
  login: Log in
  logout: Log out`}
                {selectedFormat === "properties" && `common.welcome=Welcome
common.login=Log in
common.logout=Log out`}
                {selectedFormat === "csv" && `key,en
common.welcome,Welcome
common.login,Log in
common.logout,Log out`}
                {(selectedFormat === "xliff" || selectedFormat === "xliff2") && `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2">
  <file source-language="en">
    <trans-unit id="common.welcome">
      <source>Welcome</source>
    </trans-unit>
  </file>
</xliff>`}
                {selectedFormat === "gettext" && `msgid "common.welcome"
msgstr "Welcome"

msgid "common.login"
msgstr "Log in"`}
                {selectedFormat === "strings" && `"common.welcome" = "Welcome";
"common.login" = "Log in";
"common.logout" = "Log out";`}
                {selectedFormat === "android" && `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="common_welcome">Welcome</string>
  <string name="common_login">Log in</string>
</resources>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
