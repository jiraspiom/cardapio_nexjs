import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, QrCode, Smartphone, Receipt, ArrowRight, CheckCircle2, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <header className="px-6 lg:px-10 h-20 flex items-center justify-between bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 font-bold text-2xl text-blue-600" href="#">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <UtensilsCrossed className="h-6 w-6 text-white" />
          </div>
          <span className="tracking-tight">Gravidade</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" href="#features">
            Funcionalidades
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" href="#benefits">
            Benefícios
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" href="#pricing">
            Preços
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="font-medium">Login</Button>
          </Link>
          <Link href="/admin">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
              Começar Agora
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-white to-slate-50 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10" />

          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  Novo: Pagamento via PIX integrado
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                  O Sistema Operacional para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Restaurantes Modernos</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl leading-relaxed">
                  Automatize pedidos, elimine erros e proporcione uma experiência inesquecível. Do QR Code à cozinha em segundos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                <Link href="/admin">
                  <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 w-full sm:w-auto">
                    Criar Conta Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-slate-200 hover:bg-slate-50 w-full sm:w-auto">
                    Ver Demonstração
                  </Button>
                </Link>
              </div>

              {/* Mockup / Visual */}
              <div className="mt-16 relative w-full max-w-5xl mx-auto perspective-1000">
                <div className="relative rounded-xl border bg-white shadow-2xl overflow-hidden transform rotate-x-12 transition-transform hover:rotate-0 duration-700">
                  <div className="absolute top-0 w-full h-12 bg-slate-100 border-b flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="pt-12 p-8 grid grid-cols-3 gap-8 h-[400px] bg-slate-50/50">
                    {/* Abstract UI Representation */}
                    <div className="col-span-1 bg-white rounded-lg shadow-sm p-4 space-y-3 border">
                      <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                      <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
                      <div className="h-32 bg-blue-50 rounded-lg mt-4"></div>
                    </div>
                    <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 border space-y-4">
                      <div className="flex justify-between">
                        <div className="h-8 w-32 bg-slate-200 rounded"></div>
                        <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-slate-100 rounded-lg"></div>
                        <div className="h-24 bg-slate-100 rounded-lg"></div>
                        <div className="h-24 bg-slate-100 rounded-lg"></div>
                      </div>
                      <div className="h-40 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                        Área de Pedidos em Tempo Real
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 mb-4">Tudo que você precisa para crescer</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Uma suíte completa de ferramentas projetada para aumentar o ticket médio e a rotatividade das mesas.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Cardápio Digital QR</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Seus clientes acessam o cardápio instantaneamente sem baixar apps. Atualize preços e fotos em tempo real.
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Pedidos Mobile</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  O cliente pede direto pelo celular. O pedido chega na cozinha formatado e pronto para produção. Zero erros.
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Divisão de Conta</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Chega de calculadora na mesa. O sistema divide a conta automaticamente por pessoa ou por consumo.
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Alta Performance</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Interface ultra-rápida construída com tecnologia de ponta para garantir que você nunca perca uma venda.
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Gestão Simplificada</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Painel administrativo intuitivo para gerenciar mesas, produtos e categorias sem dor de cabeça.
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Segurança Total</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Dados criptografados e proteção contra fraudes para você e seus clientes ficarem tranquilos.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-blue-600 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Pronto para modernizar seu restaurante?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Junte-se a centenas de estabelecimentos que já estão faturando mais com o Gravidade.
            </p>
            <Link href="/admin">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-lg text-blue-600 hover:bg-white">
                Começar Gratuitamente
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container px-4 md:px-6 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link className="flex items-center gap-2 font-bold text-xl text-white mb-4" href="#">
              <UtensilsCrossed className="h-6 w-6" />
              <span>Gravidade</span>
            </Link>
            <p className="text-sm">Tecnologia que impulsiona a gastronomia.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Funcionalidades</Link></li>
              <li><Link href="#" className="hover:text-white">Preços</Link></li>
              <li><Link href="#" className="hover:text-white">Integrações</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Sobre</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Carreiras</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Privacidade</Link></li>
              <li><Link href="#" className="hover:text-white">Termos</Link></li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 Gravidade SaaS. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
