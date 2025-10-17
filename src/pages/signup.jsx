import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuralyLogo from "../components/common/AuralyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const zodiacSigns = [
  { value: "aries", label: "Áries" },
  { value: "taurus", label: "Touro" },
  { value: "gemini", label: "Gêmeos" },
  { value: "cancer", label: "Câncer" },
  { value: "leo", label: "Leão" },
  { value: "virgo", label: "Virgem" },
  { value: "libra", label: "Libra" },
  { value: "scorpio", label: "Escorpião" },
  { value: "sagittarius", label: "Sagitário" },
  { value: "capricorn", label: "Capricórnio" },
  { value: "aquarius", label: "Aquário" },
  { value: "pisces", label: "Peixes" }
];

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
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
            <h2 className="text-2xl font-semibold text-gray-900">Criar conta</h2>
            <p className="text-sm text-gray-600 mt-2">Comece sua jornada espiritual</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Criar senha</Label>
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
              <Label htmlFor="confirmPassword">Repetir senha</Label>
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
              <Label htmlFor="zodiacSign">Escolher signo</Label>
              <Select value={zodiacSign} onValueChange={setZodiacSign} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione seu signo" />
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

            <Button type="submit" className="w-full bg-[#1C132F] hover:bg-[#2A1F45] text-white">
              Criar conta
            </Button>
          </form>

          <div className="text-center text-sm pt-4 border-t">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#1C132F] hover:underline font-semibold"
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
