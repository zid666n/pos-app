import ProfitCard from "../components/molecules/ProfitCard";

export default function DashboardPage() {
    return <div className="grid grid-cols-3 gap-3">
        <ProfitCard />
        <ProfitCard />
        <ProfitCard />
    </div>
}