import { Helmet } from "react-helmet-async"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const SignInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof SignInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    }
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de autenticação para o seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => {
            handleSignIn(data);
          },
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o link de autenticação.");
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up" className="">Novo estabelecimento</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
            <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                {...register("email", { required: true })}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}