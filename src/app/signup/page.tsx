"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, Building, Eye, EyeOff, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const signupSchema = z.object({
  // Organisation details
  organisationName: z.string().min(2, "Organisation name must be at least 2 characters"),
  organisationCode: z.string().min(2, "Organisation code must be at least 2 characters").max(20).optional(),
  // Owner details
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  // Consent
  consent: z.boolean().refine((val) => val === true, "You must agree to the Privacy Policy and Terms of Use"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{ valid: boolean; errors: string[] }>({
    valid: false,
    errors: [],
  });

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      organisationName: "",
      organisationCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      consent: false,
    },
    mode: "onChange",
  });

  const generateOrgCode = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 4).toUpperCase();
    }
    return words.map(w => w[0]).join('').toUpperCase().substring(0, 4);
  };

  const handleSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisationName: data.organisationName,
          organisationCode: data.organisationCode || generateOrgCode(data.organisationName),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          password: data.password,
          consent: data.consent,
          policyVersion: process.env.NEXT_PUBLIC_PRIVACY_POLICY_VERSION || "1.0",
          termsVersion: process.env.NEXT_PUBLIC_TERMS_OF_USE_VERSION || "1.0",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error || "Registration failed. Please try again.");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = form.watch("password");
  const organisationName = form.watch("organisationName");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-brand text-3xl text-primary">
            <span className="font-bold">EduMan.</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Manage Every Student.</p>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Create your institute account</CardTitle>
            <CardDescription>
              Set up your organisation and owner account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {formError && (
                <Alert variant="destructive" className="text-sm">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {/* Organisation Details */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Organisation Details
                </legend>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organisation Name *</Label>
                    <Input
                      id="organisationName"
                      placeholder="e.g. Bright Future Coaching"
                      {...form.register("organisationName")}
                      disabled={isLoading}
                    />
                    {form.formState.errors.organisationName && (
                      <p className="text-sm text-destructive">{form.formState.errors.organisationName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organisationCode">Organisation Code *</Label>
                    <Input
                      id="organisationCode"
                      placeholder="Auto-generated from name"
                      value={form.watch("organisationCode") || (organisationName ? generateOrgCode(organisationName) : "")}
                      className="font-mono uppercase"
                      {...form.register("organisationCode")}
                      disabled={isLoading}
                      maxLength={20}
                    />
                    <p className="text-xs text-muted-foreground">Unique code for staff/parent login (2-20 chars)</p>
                    {form.formState.errors.organisationCode && (
                      <p className="text-sm text-destructive">{form.formState.errors.organisationCode.message}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Owner Details */}
              <fieldset className="space-y-4 border-t pt-6">
                <legend className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Owner Account Details
                </legend>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...form.register("firstName")}
                      disabled={isLoading}
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...form.register("lastName")}
                      disabled={isLoading}
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="owner@institute.com"
                      className="pl-10"
                      {...form.register("email")}
                      disabled={isLoading}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...form.register("phone")}
                    disabled={isLoading}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      {...form.register("password")}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                  )}

                  {password && (
                    <div className="space-y-1">
                      <div className="flex gap-1" role="progressbar" aria-valuenow={passwordStrength.errors.length === 0 ? 100 : 25 * (4 - passwordStrength.errors.length)} aria-valuemin={0} aria-valuemax={100}>
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "h-1.5 flex-1 rounded transition-colors",
                              level <= 4 - passwordStrength.errors.length
                                ? passwordStrength.errors.length === 0
                                  ? "bg-success"
                                  : level <= 2
                                  ? "bg-danger"
                                  : "bg-warning"
                                : "bg-border"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {passwordStrength.errors.length === 0
                          ? "Strong password"
                          : passwordStrength.errors.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      {...form.register("confirmPassword")}
                      disabled={isLoading}
                    />
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </fieldset>

              {/* Consent */}
              <fieldset className="space-y-4 border-t pt-6 bg-muted/50 rounded-lg p-4">
                <legend className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Consent & Legal
                </legend>

                <div className="space-y-3">
                  <Label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={form.watch("consent")}
                      onCheckedChange={(checked) => form.setValue("consent", checked === true)}
                      className="mt-0.5"
                    />
                    <div className="text-sm leading-relaxed">
                      <span className="font-medium">By clicking Continue, you agree to our </span>
                      <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      <span className="font-medium"> and </span>
                      <Link href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Terms of Use
                      </Link>
                      <span className="font-medium">.</span>
                    </div>
                  </Label>

                  {form.formState.errors.consent && (
                    <p className="text-sm text-destructive ml-6">{form.formState.errors.consent.message}</p>
                  )}

                  <p className="text-xs text-muted-foreground ml-6">
                    We collect and process your data in accordance with the Digital Personal Data Protection Act, 2023.
                    Your consent is recorded with timestamp, document versions, and registration method for audit purposes.
                  </p>
                </div>
              </fieldset>

              <Button type="submit" className="w-full" disabled={isLoading || !form.watch("consent")}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}