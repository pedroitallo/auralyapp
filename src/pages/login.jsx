import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuralyLogo from "../components/common/AuralyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <AuralyLogo className="mb-8" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Bem-vindo de volta</h2>
            <p className="text-sm text-gray-600 mt-2">Entre com suas credenciais</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <Label htmlFor="password">Senha</Label>
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

            <Button type="submit" className="w-full bg-[#1C132F] hover:bg-[#2A1F45] text-white">
              Entrar
            </Button>
          </form>

          <div className="space-y-3 text-center text-sm">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-[#1C132F] hover:underline block w-full"
            >
              Esqueci minha senha
            </button>

            <button
              onClick={() => navigate("/help")}
              className="text-gray-600 hover:underline block w-full"
            >
              Preciso de ajuda
            </button>

            <div className="pt-4 border-t">
              <p className="text-gray-600">
                Não tem uma conta?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-[#1C132F] hover:underline font-semibold"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
