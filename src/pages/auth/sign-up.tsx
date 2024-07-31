import { Helmet } from "react-helmet-async"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const SignUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof SignUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });
      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o link de autenticação.");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in" className="">Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Criar conta gratis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiiro e comece suas vendas!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                type="text"
                id="restaurantName"
                placeholder="Digite o nome do estabelecimento"
                {...register("restaurantName", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                type="text"
                id="managerName"
                placeholder="Digite o seu nome"
                {...register("managerName", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite o seu e-mail"
                {...register("email", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Digite o seu celular"
                {...register("phone", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar Cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos <br /> <a href="#" className="underline underline-offset-4">Termos de Serviço</a> e <a href="#" className="underline underline-offset-4">Políticas de Privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}