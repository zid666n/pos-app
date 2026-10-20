import React from "react";
import AppInputGroup from "../components/molecules/AppInputGroup";
import useGetProduct from "../hooks/product/useGetProduct";
import useCreateTransaction from "../hooks/transaction/useCreateTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "../lib/shadcn/ui/card";
import { Field, FieldLabel } from "../lib/shadcn/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../lib/shadcn/ui/select";
import { Button } from "../lib/shadcn/ui/button";

export default function FormTransactionPage() {
    const {addToCart, cart, removeFromCart, updateQty} = useCreateTransaction()

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
                <CardContent className="p-2 grid grid-rows-1 gap-5 overflow-y-auto max-h-[702px]">
                    {cart.map((cartProduct, index) => (
                        <React.Fragment key={index}>
                            <div className="space-y-0.5">
                                <h4 className="font-semibold">{cartProduct.name}</h4>
                                <span className="text-muted-foreground text-xs">Rp {cartProduct.price}</span>
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
                            <Select name="payment_method" onValueChange={(a) => console.log(a)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select One">

                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">
                                    QRIS
                                </SelectItem>
                                <SelectItem value="2">
                                    Cash
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </Field>
                    <AppInputGroup
                        defaultValue="a"
                        label="Pay"
                        name="cash"
                        onChange={() => {}}
                        placeholder="Enter your cash"
                        type="number"
                    />
                    
                    <Button disabled={cart.length < 1}>Save Transaction</Button>
                </CardContent>
            </Card> 
        </div>
    </div>
}