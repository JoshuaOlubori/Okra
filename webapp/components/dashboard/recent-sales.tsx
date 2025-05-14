import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className={sale.avatarColor}>
              {getInitials(sale.name)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">
              {sale.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            ₦{sale.amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

const recentSales = [
  {
    id: 1,
    name: "Adeleke Brands",
    email: "adeleke@example.com",
    amount: 14250,
    avatarColor: "bg-green-100 text-green-800"
  },
  {
    id: 2,
    name: "Ngozi Foods",
    email: "ngozi@example.com",
    amount: 8750,
    avatarColor: "bg-blue-100 text-blue-800"
  },
  {
    id: 3,
    name: "Lagos Market Ltd",
    email: "lagosmarket@example.com",
    amount: 29000,
    avatarColor: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    name: "Kaduna Traders",
    email: "kaduna@example.com",
    amount: 12000,
    avatarColor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 5,
    name: "Port Harcourt Exports",
    email: "phe@example.com",
    amount: 42500,
    avatarColor: "bg-red-100 text-red-800"
  }
];