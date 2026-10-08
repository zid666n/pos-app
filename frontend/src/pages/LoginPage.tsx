import FormLogin from "../components/organism/FormLogin";

export default function LoginPage() {
    return <div className="h-screen flex items-center justify-center">
        <div className="space-y-8 w-full max-w-lg">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Point Of Sales | PPKD JP</h1>
                <p className="text-center text-gray-500 text-xl">Point of sales</p>
            </div>
            <FormLogin />
        </div>
    </div>
}