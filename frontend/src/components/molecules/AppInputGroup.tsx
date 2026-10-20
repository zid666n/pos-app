import { Field } from "../../lib/shadcn/ui/field";
import { Input } from "../../lib/shadcn/ui/input";
import { Label } from "../../lib/shadcn/ui/label";

interface IAppInputGroup {
    label: string,
    placeholder: string,
    name: string,
    type: "text" | "number" | "email" | "password"
    onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void,
    defaultValue: string|number
}

export default function AppInputGroup({
    label,
    onChange,
    type,
    name,
    placeholder,
    defaultValue
}: IAppInputGroup) {
    return <Field className="max-w-full">
        <Label htmlFor={label}>{label}</Label>
            <Input
                id={label}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
            />
    </Field>
}