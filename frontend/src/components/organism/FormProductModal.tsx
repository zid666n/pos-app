import { useState } from "react"
import useGetCategory from "../../hooks/category/useGetCategory"
import { Field, FieldLabel } from "../../lib/shadcn/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../lib/shadcn/ui/select"
import type { TProduct } from "../../services/productService"
import AppInputGroup from "../molecules/AppInputGroup"
import AppModal from "../molecules/AppModal"

interface IFormProductModal {
    title: string,
    isOpen: boolean,
    isLoading: boolean,
    handleClose: () => void,
    handleSelect: (name: string, value: string|number) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
    product?: TProduct
}

export default function FormProductModal({
    title,
    handleChange,
    handleClose,
    handleSubmit,
    handleSelect,
    isOpen,
    isLoading,
    product
}: IFormProductModal) {
    const {data} = useGetCategory()
    const [selectedCategory, setSelectedCategory] = useState<string|undefined>(undefined)

    return <AppModal
        handleClose={handleClose}
        isLoading={isLoading}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        title={title}
    >
        <Field className="max-w-full">
            <FieldLabel>Category</FieldLabel>
                <Select name="category" onValueChange={(val) => {
                    handleSelect('category_id', Number(val))

                    console.log(val)
                }}>
            <SelectTrigger> 
                <SelectValue placeholder="Pilih kategori..">
                    {selectedCategory && selectedCategory}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data && data.data.map(category => (
                        <SelectItem key={category.id} value={String(category.id)} onClick={() => setSelectedCategory(category.name)}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
            </Select>
        </Field>
        <AppInputGroup
            defaultValue={product ? product.name : ""}
            label="Name"
            onChange={handleChange}
            placeholder="ex: Americano"
            name="name"
            type="text"
        />
        <AppInputGroup
            defaultValue={product ? product.quantity : 0}
            label="Quantity"
            onChange={handleChange}
            placeholder="ex: 10"
            name="quantity"
            type="number"
        />
        <AppInputGroup
            defaultValue={product ? product.price : 0}
            label="Price"
            onChange={handleChange}
            placeholder="ex: 10000"
            name="price"
            type="number"
        />
        <Field className="max-w-full">
            <FieldLabel>Status</FieldLabel>
                <Select name="status" defaultValue={"active"} onValueChange={(val) => handleSelect('is_active', String(val))}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="active">
                        Active      
                    </SelectItem>
                    <SelectItem value="deactive">
                        Deactive
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
        </Field>
    </AppModal>
}