import { getSaldos } from "@/server/api/keuangan/queries";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { HandCoins, Wallet, WalletCards, Landmark } from "lucide-react";

export async function SaldoSection() {
  const saldos = await getSaldos();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Infaq Massjid"
          content={formatCurrency(saldos.masjid)}
          icon={<Landmark className="h-5 w-5" />}
          description="Sisa saldo infaq masjid"
        />
        <Card
          title="Infaq Jum'at"
          content={formatCurrency(saldos.jumat)}
          icon={<Wallet className="h-5 w-5" />}
          description="Sisa saldo infaq jum'at"
        />
        <Card
          title="Infaq Ramadhan"
          content={formatCurrency(saldos.ramadhan)}
          icon={<WalletCards className="h-5 w-5" />}
          description="Sisa saldo infaq ramadhan"
        />
        <Card
          title="Infaq Anak Yatim"
          content={formatCurrency(saldos.yatim)}
          icon={<HandCoins className="h-5 w-5" />}
          description="Sisa saldo infaq anak yatim"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  content,
  description,
  icon,
}: {
  title: string;
  content: string;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-gray-400/5 ring-1 ring-inset ring-gray-900/10 p-5">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium">{title}</div>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-semibold">{content}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
