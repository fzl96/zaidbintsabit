import { getSaldos } from "@/server/api/keuangan/queries";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { HandCoins, Wallet, WalletCards, Landmark } from "lucide-react";

export async function DashboardCards() {
  const saldos = await getSaldos();

  return (
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
  );
}

export function Card({
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
    <CardComponent>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{content}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </CardComponent>
  );
}
