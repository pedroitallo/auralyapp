import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuralyLogo from "../components/common/AuralyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/api/entities";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailExists = await User.checkEmailExists(email);

      if (!emailExists) {
        toast.error("Email not registered. Please sign up first.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetpassword`,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <AuralyLogo className="mb-8" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {!isSubmitted ? (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Reset password</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Enter your email and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#1C132F] hover:bg-[#2A1F45] text-white" disabled={loading}>
                  {loading ? "Sending..." : "Reset password"}
                </Button>
              </form>

              <div className="text-center text-sm pt-4 border-t">
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#1C132F] hover:underline font-semibold"
                >
                  Back to login
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Check your email</h2>
              <p className="text-sm text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-[#1C132F] hover:bg-[#2A1F45] text-white mt-6"
              >
                Back to login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
