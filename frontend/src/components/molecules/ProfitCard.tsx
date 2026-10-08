import { DollarSignIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../../lib/shadcn/ui/card";

export default function ProfitCard() {
    return <Card className="shadow-lg border-border p-6">
        <CardHeader className="flex justify-between">
            <CardTitle>
                <h3>Monthly Profit</h3>
            </CardTitle>
            <DollarSignIcon />
        </CardHeader>
    </Card>
}