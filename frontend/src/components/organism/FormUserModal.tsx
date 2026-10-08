import { Field, FieldLabel } from "../../lib/shadcn/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../lib/shadcn/ui/select";
import AppInputGroup from "../molecules/AppInputGroup";
import AppModal from "../molecules/AppModal";

interface IFormUserModal {
    title: string,
    isOpen: boolean,
    isLoading: boolean,
    handleClose: () => void,
    handleSelect: (name: string, value: string) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
}

export default function FormUserModal({
    title,
    handleChange,
    handleClose,
    handleSubmit,
    handleSelect,
    isOpen,
    isLoading
}: IFormUserModal) {
    return <AppModal
        handleClose={handleClose}
        isLoading={isLoading}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        title={title}
    >
        <AppInputGroup
            label="Name"
            onChange={handleChange}
            placeholder="ex: zidan"
            name="name"
            type="text"
        />
        <AppInputGroup
            label="email"
            onChange={handleChange}
            placeholder="ex: zidan@example.com"
            name="email"
            type="text"
        />
        <Field className="max-w-sm">
            <FieldLabel>Status</FieldLabel>
            <Select name="status" defaultValue="active" onValueChange={(val) => handleSelect('status', String(val))}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="active">
                        Active      
                    </SelectItem>
                    <SelectItem value="non-active">
                        Non-active
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
        </Field>
        <AppInputGroup
            label="password"
            onChange={handleChange}
            placeholder=""
            name="password"
            type="password"
        />
    </AppModal>
}