import useLogin from "../../hooks/useLogin";
import { Button } from "../../lib/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../lib/shadcn/ui/card";
import { Field, FieldLabel } from "../../lib/shadcn/ui/field";
import { Input } from "../../lib/shadcn/ui/input";

export default function FormLogin() {
    const { handleChange, handleSubmit, loading } = useLogin()

    return <Card className="w-full">
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Field>
                            <FieldLabel htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                onChange={handleChange}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                />
                        </Field>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                    type="password"
                                    required
                                />
                            </Field>
                        </div>
                    </div>
                </div>
                <div className="flex mt-12">
                    <Button type="submit" className="w-full cursor-pointer">
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </div>
            </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 mt-2">
            
        </CardFooter> */}
    </Card>
}