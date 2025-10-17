import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuralyLogo from "../components/common/AuralyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/api/entities";
import { toast } from "sonner";

const zodiacSigns = [
  { value: "aries", label: "Aries" },
  { value: "taurus", label: "Taurus" },
  { value: "gemini", label: "Gemini" },
  { value: "cancer", label: "Cancer" },
  { value: "leo", label: "Leo" },
  { value: "virgo", label: "Virgo" },
  { value: "libra", label: "Libra" },
  { value: "scorpio", label: "Scorpio" },
  { value: "sagittarius", label: "Sagittarius" },
  { value: "capricorn", label: "Capricorn" },
  { value: "aquarius", label: "Aquarius" },
  { value: "pisces", label: "Pisces" }
];

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");
  const [isPreFilled, setIsPreFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlName = searchParams.get("nome");
    const urlEmail = searchParams.get("email");

    if (urlName || urlEmail) {
      if (urlName) setName(urlName);
      if (urlEmail) setEmail(urlEmail);
      setIsPreFilled(true);
    }
  }, [searchParams]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!zodiacSign) {
      toast.error("Please select your zodiac sign");
      return;
    }

    setLoading(true);

    try {
      await User.register({
        email,
        password,
        name,
        zodiacSign,
      });
      toast.success("Account created successfully");
      navigate("/onboarding");
    } catch (error) {
      if (error.message === 'Email already registered') {
        toast.error("Email already registered. Please login.");
      } else {
        toast.error(error.message || "Failed to create account");
      }
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
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Create account</h2>
            <p className="text-sm text-gray-600 mt-2">Start your spiritual journey</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPreFilled}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPreFilled}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Create password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zodiacSign">Choose zodiac sign</Label>
              <Select value={zodiacSign} onValueChange={setZodiacSign} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your zodiac sign" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.value} value={sign.value}>
                      {sign.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-[#1C132F] hover:bg-[#2A1F45] text-white" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm pt-4 border-t">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#1C132F] hover:underline font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
