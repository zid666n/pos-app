import { useNavigate } from "react-router-dom";
import { Button } from "../lib/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../lib/shadcn/ui/card";

export default function PrintTransactionPage() {
    const navigate = useNavigate()

    return (
        <>
            <div className="mx-w-md mx-auto my-6 space-y-4">
                <div className="flex items-center justify-between print:hidden">
                    <Button variant='outline' onClick={() => navigate('/transactions')}>
                        Back
                    </Button>
                    <Button size='sm' className='bg-primary'>
                        Print Struck
                    </Button>
                </div>
            </div>
            <Card className="border border-border/80 shadow-none font-mono text-xs p-6 bg-white text-black print:border-none">
                <CardHeader className="text-center p-0 pb-4 border-b border-dashed border-zinc-400">
                    <CardTitle className="text-base font-bold uppercase tracking-wider">
                        POS PPKD Jakarta Pusat
                    </CardTitle>
                    <p className="text-[11px] text-zinc-600">Jl. Karet Baru</p>
                    <p className="text-zinc-500 mt-1 text-[11px]">{new Date().toLocaleString('id-ID')}</p>
                </CardHeader>
                <CardContent className="p-0 pt-3 space-y-3">
                    <div className="space-y-0 5 text-[11px]">
                        <div className="flex justify-between items-center">
                            <span>Order Number</span>
                            <span className="uppercase">QRIS</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Payment Method</span>
                            <span className="uppercase">QRIS</span>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-zinc-400 pt-2 space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-semibold">Mie Sedaap</div>
                                <div className="text-[10px] text-zinc-600">
                                    1 x Rp. 100.000
                                </div>
                            </div>
                            <div className="font-medium">
                                Rp. 100.000
                            </div>
                        </div>
                        <div className="botfrt-t border-dashed border-zinc-400 pt-2 space-y-1">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rp. 100.000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax(10%)</span>
                                <span>Rp. 100.000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total</span>
                                <span>Rp. 100.000</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}