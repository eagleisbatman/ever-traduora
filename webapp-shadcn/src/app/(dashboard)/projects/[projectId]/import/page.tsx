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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const supportedFormats = [
  { id: "json", name: "JSON", extension: ".json", icon: "📄" },
  { id: "xliff", name: "XLIFF", extension: ".xlf, .xliff", icon: "📋" },
  { id: "csv", name: "CSV", extension: ".csv", icon: "📊" },
  { id: "yaml", name: "YAML", extension: ".yml, .yaml", icon: "📝" },
  { id: "properties", name: "Java Properties", extension: ".properties", icon: "☕" },
  { id: "gettext", name: "Gettext", extension: ".po", icon: "📦" },
  { id: "strings", name: "iOS Strings", extension: ".strings", icon: "🍎" },
  { id: "android", name: "Android XML", extension: ".xml", icon: "🤖" },
];

export default function ImportPage() {
  const params = useParams();
  const [selectedLocale, setSelectedLocale] = React.useState<string>("");
  const [selectedFormat, setSelectedFormat] = React.useState<string>("");
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleImport = async () => {
    if (!uploadedFile || !selectedLocale || !selectedFormat) return;
    setIsUploading(true);
    // Simulate upload - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadedFile(null);
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
          <h1 className="text-2xl font-bold tracking-tight">Import Translations</h1>
          <p className="text-muted-foreground">
            Import translations from various file formats
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>
              Drag and drop a file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dropzone */}
            <div
              className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50",
                uploadedFile && "border-green-500 bg-green-500/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleFileSelect}
                accept=".json,.xlf,.xliff,.csv,.yml,.yaml,.properties,.po,.strings,.xml"
              />
              {uploadedFile ? (
                <>
                  <Icons.checkCircle className="h-12 w-12 text-green-500" />
                  <p className="mt-4 font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Remove file
                  </Button>
                </>
              ) : (
                <>
                  <Icons.upload className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 font-medium">Drop your file here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                </>
              )}
            </div>

            <Separator />

            {/* Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select value={selectedLocale} onValueChange={setSelectedLocale}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="fr">🇫🇷 French</SelectItem>
                    <SelectItem value="de">🇩🇪 German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>File Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedFormats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.icon} {format.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!uploadedFile || !selectedLocale || !selectedFormat || isUploading}
              onClick={handleImport}
            >
              {isUploading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Icons.upload className="mr-2 h-4 w-4" />
                  Import Translations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Supported formats */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Formats</CardTitle>
            <CardDescription>
              Choose from a variety of translation file formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {supportedFormats.map((format) => (
                <div
                  key={format.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <span className="text-2xl">{format.icon}</span>
                  <div>
                    <p className="font-medium">{format.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format.extension}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
