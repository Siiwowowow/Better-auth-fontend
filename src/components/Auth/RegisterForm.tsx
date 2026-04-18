/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Camera, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "@/app/(authRouteGroup)/(auth)/register/_action";
import AppField from "../shared/form/AppField";
import SocialLogin from "../shared/socialLogin/socialLogin";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // ✅ Image preview state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsPending(true);

      try {
        // ✅ Zod validation
        const parsed = registerZodSchema.safeParse(value);
        if (!parsed.success) {
          setServerError(parsed.error.issues[0]?.message || "Invalid input");
          setIsPending(false);
          return;
        }

        // ✅ FormData তৈরি করুন
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("email", value.email);
        formData.append("password", value.password);

        if (imageFile) {
          formData.append("profilePhoto", imageFile);
        }

        const result = await registerAction(formData) as any;

        if (!result.success) {
          setServerError(result.message || "Registration failed");
          toast.error(result.message);
          return;
        }

        toast.success("Registration successful! Please verify your email.");
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (error: any) {
        setServerError(`Registration failed: ${error.message}`);
        toast.error(error.message);
      } finally {
        setIsPending(false);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB limit check
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Get initials for placeholder
  const getInitials = (name: string) => {
    return name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "?";
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>Fill in your details to get started.</CardDescription>
      </CardHeader>

      <CardContent>
        {/* ✅ Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-full border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors overflow-hidden bg-blue-50 flex items-center justify-center focus:outline-none"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-blue-400">
                  <Camera className="w-7 h-7" />
                  <span className="text-xs font-medium">Upload</span>
                </div>
              )}

              {/* Hover overlay */}
              {imagePreview && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              )}
            </button>

            {/* Remove button */}
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {imagePreview ? imageFile?.name : "Click to upload profile photo (optional)"}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form fields */}
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="name"
            validators={{ onChange: registerZodSchema.shape.name }}
          >
            {(field) => (
              <AppField field={field} label="Full Name" type="text" placeholder="Enter your full name" />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{ onChange: registerZodSchema.shape.email }}
          >
            {(field) => (
              <AppField field={field} label="Email" type="email" placeholder="Enter your email" />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: registerZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                append={
                  <Button type="button" onClick={() => setShowPassword((v) => !v)} variant="ghost" size="icon">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) return "Passwords do not match";
                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                append={
                  <Button type="button" onClick={() => setShowConfirmPassword((v) => !v)} variant="ghost" size="icon">
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Creating Account..."
                disabled={!canSubmit}
              >
                Sign Up
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SocialLogin />
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;