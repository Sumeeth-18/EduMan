"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Building, User, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { MFALoginPage } from "./MFALoginPage";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(1, "Password is required").optional(),
  organisationCode: z.string().optional(),
  username: z.string().optional(),
  totpCode: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");
  const mfaRequired = searchParams.get("mfa") === "required";

  const [activeTab, setActiveTab] = useState<string>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const emailForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const orgForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      organisationCode: "",
      username: "",
      password: "",
      totpCode: "",
      rememberMe: false,
    },
  });

  const handleEmailLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "MFA_REQUIRED") {
          router.push(`/login?mfa=required&email=${encodeURIComponent(data.email || "")}&rememberMe=${data.rememberMe}`);
          return;
        }
        setFormError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrgLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const result = await signIn("credentials", {
        organisationCode: data.organisationCode,
        username: data.username,
        password: data.password,
        totpCode: data.totpCode,
        rememberMe: data.rememberMe,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "MFA_REQUIRED") {
          router.push(`/login?mfa=required&organisationCode=${encodeURIComponent(data.organisationCode || "")}&username=${encodeURIComponent(data.username || "")}&rememberMe=${data.rememberMe}`);
          return;
        }
        setFormError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  if (mfaRequired) {
    return <MFALoginPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-brand text-3xl text-primary">
            <span className="font-bold">EduMan.</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Manage Every Student.</p>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>
              Choose your login method based on your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email / Google
                </TabsTrigger>
                <TabsTrigger value="org">
                  <Building className="mr-2 h-4 w-4" />
                  Org Code + Username
                </TabsTrigger>
              </TabsList>

              {activeTab === "email" && (
                <TabsContent value="email" className="space-y-4">
                  <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                    {formError && (
                      <Alert variant="destructive" className="text-sm">
                        <AlertDescription>{formError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...emailForm.register("email")}
                          disabled={isLoading}
                        />
                      </div>
                      {emailForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...emailForm.register("password")}
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
                      {emailForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{emailForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={emailForm.watch("rememberMe")}
                          onCheckedChange={(checked) => emailForm.setValue("rememberMe", checked === true)}
                        />
                        <span className="text-sm">Remember me</span>
                      </Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Sign in
                    </Button>
                  </form>

                  {process.env.NEXT_PUBLIC_ENABLE_GOOGLE_OAUTH === "true" && (
                    <>
                      <Separator className="my-4">Or continue with</Separator>
                      <Button variant="outline" onClick={handleGoogleLogin} className="w-full" disabled={isLoading}>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </>
                  )}
                </TabsContent>
              )}

              {activeTab === "org" && (
                <TabsContent value="org" className="space-y-4">
                  <form onSubmit={orgForm.handleSubmit(handleOrgLogin)} className="space-y-4">
                    {formError && (
                      <Alert variant="destructive" className="text-sm">
                        <AlertDescription>{formError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="organisationCode">Organisation Code</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="organisationCode"
                          type="text"
                          placeholder="e.g. EDUM"
                          className="pl-10 uppercase"
                          {...orgForm.register("organisationCode")}
                          disabled={isLoading}
                        />
                      </div>
                      {orgForm.formState.errors.organisationCode && (
                        <p className="text-sm text-destructive">{orgForm.formState.errors.organisationCode.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="your-username"
                          className="pl-10"
                          {...orgForm.register("username")}
                          disabled={isLoading}
                        />
                      </div>
                      {orgForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{orgForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="orgPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...orgForm.register("password")}
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
                      {orgForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{orgForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    {error === "MFA_REQUIRED" && (
                      <div className="space-y-2">
                        <Label htmlFor="totpCode">2FA Code</Label>
                        <Input
                          id="totpCode"
                          type="text"
                          placeholder="123456"
                          className="font-mono text-center tracking-widest"
                          {...orgForm.register("totpCode")}
                          disabled={isLoading}
                          autoComplete="one-time-code"
                        />
                        <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={orgForm.watch("rememberMe")}
                          onCheckedChange={(checked) => orgForm.setValue("rememberMe", checked === true)}
                        />
                        <span className="text-sm">Remember me</span>
                      </Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Sign in
                    </Button>
                  </form>
                </TabsContent>
              )}
            </Tabs>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}