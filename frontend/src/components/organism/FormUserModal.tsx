import { Field, FieldLabel } from "../../lib/shadcn/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../lib/shadcn/ui/select";
import type { TUsers } from "../../services/userService";
import AppInputGroup from "../molecules/AppInputGroup";
import AppModal from "../molecules/AppModal";

interface IFormUserModal {
    title: string,
    isOpen: boolean,
    isLoading: boolean,
    handleClose: () => void,
    handleSelect: (name: string, value: string) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
    user?: TUsers
}

export default function FormUserModal({
    title,
    handleChange,
    handleClose,
    handleSubmit,
    handleSelect,
    isOpen,
    isLoading,
    user
}: IFormUserModal) {
    return <AppModal
        handleClose={handleClose}
        isLoading={isLoading}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        title={title}
    >
        <AppInputGroup
            defaultValue={user ? user.name : ""}
            label="Name"
            onChange={handleChange}
            placeholder="ex: zidan"
            name="name"
            type="text"
        />
        <AppInputGroup
            defaultValue={user ? user.email : ""}
            label="email"
            onChange={handleChange}
            placeholder="ex: zidan@example.com"
            name="email"
            type="text"
        />
        <Field className="max-w-full">
            <FieldLabel>Status</FieldLabel>
                <Select name="status" defaultValue={user ? (user.is_active ? "active" : "deactive" ) : "active"} onValueChange={(val) => handleSelect('is_active', String(val))}>
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
        <AppInputGroup
            defaultValue=""
            label="password"
            onChange={handleChange}
            placeholder=""
            name="password"
            type="password"
        />
    </AppModal>
}