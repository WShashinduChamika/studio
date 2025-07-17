"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth-form";
import { Home } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (data: { email: any; password: any }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center bg-background py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <Home className="h-12 w-auto text-primary" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Sign in to TimeWise
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:text-primary/90"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <AuthForm onSubmit={handleLogin} buttonText="Sign In" />
        </div>
      </div>
    </div>
  );
}
