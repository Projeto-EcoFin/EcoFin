import Button from "@/components/Button";
import Card from "@/components/Card";
import Progress from "@/components/Progress";
import Alert, { AlertDescription } from "@/components/Alert";
import { BarChart3, FileText, Menu, User, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const transactions = [
    { name: "Supermercado", category: "Alimentação", amount: -150.75, type: "expense" },
    { name: "Salário", category: "Receitas", amount: 3000.75, type: "income" },
    { name: "Uber", category: "Transporte", amount: -25.75, type: "expense" },
    { name: "Netflix", category: "Entretenimento", amount: -39.9, type: "expense" },
  ];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(amount));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 w-full">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button className="bg-transparent hover:bg-blue-500">
              <Menu className="w-6 h-6 text-white" />
            </Button>
            <Button className="bg-transparent hover:bg-blue-500">
              <User className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Saldo Total */}
          <Card>
            <div className="space-y-2">
              <h2 className="text-sm text-gray-500">Saldo Total</h2>
              <p className="text-3xl font-bold text-gray-900">R$ 4.250,00</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Receitas:{" "}
                  <span className="text-gray-900 font-medium">R$ 5.500,00</span>
                </span>
                <span className="text-gray-500">
                  Despesas:{" "}
                  <span className="text-gray-900 font-medium">R$ 1.250,00</span>
                </span>
              </div>
            </div>
          </Card>

          {/* Orçamento Mensal */}
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Orçamento Mensal
                </h3>
                <span className="text-sm text-gray-500">62,5%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">R$ 1.250,00 de R$ 2.000,00</span>
                </div>
                <Progress value={62.5} />
              </div>
            </div>
          </Card>

          {/* Alerta de Gasto Excessivo */}
          <Alert>
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <AlertDescription>
              <strong>Alerta de Gastos Excessivos</strong>
              <br />
              Você gastou R$ 1200 em alimentação, R$ 200 acima da meta de R$ 1000. Considere rever suas despesas.
            </AlertDescription>
          </Alert>

          {/* Botões */}
          <div className="grid grid-cols-2 gap-4">
            <Button>
              <FileText className="w-4 h-4" />
              Relatórios
            </Button>
            <Button>
              <BarChart3 className="w-4 h-4" />
              Orçamentos
            </Button>
          </div>

          {/* Transações Recentes */}
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Transações Recentes
            </h3>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-none"
                >
                  <div>
                    <p className="text-gray-900 font-medium">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}{" "}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
