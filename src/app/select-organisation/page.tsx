"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SelectOrganisationPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isSwitching, setIsSwitching] = useState<string | null>(null);

  const organisations = session?.user?.organisations || [];

  const handleSwitch = async (orgId: string, orgCode: string) => {
    setIsSwitching(orgId);
    try {
      await update({ organisationId: orgId });
      router.push("/dashboard");
      router.refresh();
    } catch {
      setIsSwitching(null);
    }
  };

  if (organisations.length <= 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>No Organisation Switch Needed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You only have access to one organisation. Redirecting...
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-brand text-3xl text-primary">
            <span className="font-bold">EduMan.</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-4">Select Institute</h1>
          <p className="text-muted-foreground mt-2">
            You have access to multiple institutes. Choose one to continue.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {organisations.map((org) => (
            <Card
              key={org.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-card-hover",
                session?.user?.organisationId === org.id
                  ? "ring-2 ring-primary border-primary"
                  : ""
              )}
              onClick={() => handleSwitch(org.id, org.code)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      {session?.user?.organisationId === org.id && (
                        <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Code: <span className="font-mono">{org.code}</span>
                    </p>
                    {org.branches && org.branches > 1 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {org.branches} branches
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}