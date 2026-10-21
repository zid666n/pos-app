import React from "react";
import AppInputGroup from "../components/molecules/AppInputGroup";
import useGetProduct from "../hooks/product/useGetProduct";
import useCreateTransaction from "../hooks/transaction/useCreateTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "../lib/shadcn/ui/card";
import { Field, FieldLabel } from "../lib/shadcn/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../lib/shadcn/ui/select";
import { Button } from "../lib/shadcn/ui/button";

export default function FormTransactionPage() {
    const {
        addToCart,
        cart,
        formState,
        removeFromCart,
        updateQty,
        totalAmount,
        totalChange,
        handleChange,
        handleSelect,
        handleSubmit,
        selectedPaymentMethod,
        setPlaceholderPaymentMethod
    } = useCreateTransaction()

    const {data} = useGetProduct()

    return <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-8 space-y-4">
            <Card className="p-6">
                <CardHeader className=" py-2 px-5 border-b">
                    <CardTitle className="text-sm font-semibold">Available Product</CardTitle>
                </CardHeader>
                <CardContent className="p-2 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[602px]">
                    {data && data.data.map((product, index) => (
                        <button
                            key={index}
                            onClick={() => addToCart(product)}
                            className="flex flex-col justify-between p-3 rounded-lg border border-border/80 bg-card hover:border-primary/60 text-left transition-all group gap-3">
                            <div>
                                <span className="text-xs text-muted-foreground line-clamp-1">{product.category_name}</span>
                                <h4 className="font-semibold text-sm line-clamp-1 mt-0.5 group:hover:text-primary">
                                    {product.name}
                                </h4>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <span className="font-medium text-xs">Rp. {product.price}</span>
                                <span className="text-[12px] text-muted-foreground">{product.quantity}</span>
                            </div>
                        </button>
                    ))}
                        
                </CardContent>
            </Card> 
        </div>
        <div className="lg:col-span-4">
            <Card className="p-2">
                <CardHeader className=" py-2 px-5 border-b">
                    <CardTitle className="text-sm font-semibold">Summary Cart</CardTitle>
                </CardHeader>
                <CardContent className="p-2 grid grid-rows-1 gap-5 overflow-y-auto max-h-[720px]">
                    {cart.map((cartProduct, index) => (
                        <React.Fragment key={index}>
                            <div className="space-y-0.5">
                                <h4 className="font-semibold">{cartProduct.name}</h4>
                                <span className="text-muted-foreground text-xs">{Number(cartProduct.price).toLocaleString('id-ID', {style: 'currency', 'currency': 'IDR', maximumFractionDigits: 0})}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <button
                                    onClick={() => updateQty(cartProduct.id, -1)}
                                    className="border border-border shadow-sm aspect-square font-semibold w-7 text-center cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="px-4">{cartProduct.quantity}</span>
                                <button
                                    onClick={() => updateQty(cartProduct.id, 1)}
                                    className="border border-border shadow-sm aspect-square font-semibold w-7 text-center cursor-pointer"
                                >
                                    +
                                </button>
                                <button onClick={() => removeFromCart(cartProduct.id)} className="border border-border shadow-sm aspect-square font-semibold w-7 text-center text-destructive">
                                    x
                                </button>
                            </div>
                        </React.Fragment>
                    ))}
                    {/* <button className="flex flex-col justify-between p-3 rounded-lg border border-border/80 bg-card hover:border-primary/60 text-left transition-all group gap-3">
                        <div>
                            <span className="text-xs text-muted-foreground line-clamp-1">Food</span>
                            <h4 className="font-semibold text-sm line-clamp-1 mt-0.5 group:hover:text-primary">
                                Nasi Goreng
                            </h4>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-medium text-xs">Rp. 10.000</span>
                            <span className="text-[12px] text-muted-foreground">100</span>
                        </div>
                    </button> */}
                    <Field className="lg:max-w-1/2 max-w-full">
                        <FieldLabel>Payment Method</FieldLabel>
                            <Select name="payment_method" defaultValue={formState.payment_method} onValueChange={(value) => handleSelect('payment_method', Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select One">
                                {selectedPaymentMethod}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1" onClick={() => setPlaceholderPaymentMethod("QRIS")}>
                                    QRIS
                                </SelectItem>
                                <SelectItem value="2" onClick={() => setPlaceholderPaymentMethod("Cash")}>
                                    Cash
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </Field>
                    <AppInputGroup
                        defaultValue={formState.pay}
                        label="Pay"
                        name="pay"
                        onChange={handleChange}
                        placeholder="Enter your cash"
                        type="number"
                    />
                    <div className="border-t border-boder min-w-full space-y-1 pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>{Number(totalAmount).toLocaleString('id-ID', {style: 'currency', 'currency': 'IDR', maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground mb-6">
                            <span>Change</span>
                            <span>{Number(totalChange).toLocaleString('id-ID', {style: 'currency', 'currency': 'IDR', maximumFractionDigits: 0})}</span>
                        </div>
                        <Button disabled={cart.length < 1} className="w-full" onClick={() => handleSubmit()}>Save Transaction</Button>
                    </div>
                </CardContent>
            </Card> 
        </div>
    </div>
}