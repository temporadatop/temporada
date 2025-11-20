import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { APP_LOGO, APP_TITLE } from "@/const";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, register } = useLocalAuth();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerCpf, setRegisterCpf] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      toast.success("Login realizado com sucesso!");
      setLocation("/properties");
    } else {
      toast.error(result.error || "Erro ao fazer login");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      cpf: registerCpf,
    });
    if (result.success) {
      toast.success("Cadastro realizado com sucesso!");
      setLocation("/properties");
    } else {
      toast.error(result.error || "Erro ao fazer cadastro");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center gap-3 mb-8 cursor-pointer">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h1>
          </div>
        </Link>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Faça login para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Preencha seus dados para se cadastrar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="João Silva"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-phone">Telefone</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-cpf">CPF</Label>
                    <Input
                      id="register-cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={registerCpf}
                      onChange={(e) => setRegisterCpf(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Criar Conta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-4">
          <Link href="/">
            <Button variant="link">Voltar para o início</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
