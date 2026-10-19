import { Field, FieldLabel } from "../../lib/shadcn/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../lib/shadcn/ui/select";
import type { TCategory } from "../../services/categoryService";
import AppInputGroup from "../molecules/AppInputGroup";
import AppModal from "../molecules/AppModal";

interface IFormCategoryModal {
    title: string,
    isOpen: boolean,
    isLoading: boolean,
    handleClose: () => void,
    handleSelect: (name: string, value: string) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
    category?: TCategory
}

export default function FormCategoryModal({
    title,
    handleChange,
    handleClose,
    handleSubmit,
    handleSelect,
    isOpen,
    isLoading,
    category
}: IFormCategoryModal) {
    return <AppModal
        handleClose={handleClose}
        isLoading={isLoading}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        title={title}
    >
        <AppInputGroup
            defaultValue={category ? category.name : ""}
            label="Name"
            onChange={handleChange}
            placeholder="ex: Coffee"
            name="name"
            type="text"
        />
        <Field className="max-w-full">
            <FieldLabel>Status</FieldLabel>
                <Select name="status" defaultValue={category ? (category.is_active ? "active" : "deactive" ) : "active"} onValueChange={(val) => handleSelect('is_active', String(val))}>
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