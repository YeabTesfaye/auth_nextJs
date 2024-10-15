import AuthForm from "@/components/auth-form";

export interface Props {
  searchParams: {
    [key: string]: string | undefined;
  };
}
function Home({ searchParams }: Props) {
  const formMode = searchParams.mode || "login";
  return <AuthForm mode={formMode} />;
}

export default Home;
