"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useTheme } from "next-themes";
//import Link from 'next/link';
import //  useRouter,
//  useSearchParams
"next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  // const { theme } = useTheme();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get('redirect') || '/dashboard';

  const validateEmail = (email: string) => {
    const validEmails = [
      "farmer@example.com",
      "buyer@example.com",
      "logistics@example.com",
    ];
    return validEmails.includes(email.toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please use one of the demo email addresses listed below");
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setEmailError("Please use one of the demo email addresses listed below");
      return;
    }

    try {
      await login(email, password);
      // Redirect is handled in the auth context
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {/* <Logo className="h-12 w-12" logoType={theme === "dark"} /> */}
          <Logo className="h-12 w-12" logoType={false} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        {/* <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link href="/auth/register" className="font-medium text-green-600 hover:text-green-500">
            create a new account
          </Link>
        </p> */}
      </div>

      <div
        className="container 
      mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 ${emailError ? "border-red-500" : ""}`}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {emailError}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>Important:</strong> You must use one of these demo
                emails: farmer@example.com, buyer@example.com, or
                logistics@example.com
              </p>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Any password will work for this demo
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
