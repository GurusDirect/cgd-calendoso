/*
import { getSession } from "@lib/auth";

function RedirectPage() {
  return;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }

  return { redirect: { permanent: false, destination: "/event-types" } };
}

export default RedirectPage;
*/
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";

function HomePage() {
  const [session] = useSession();

  useEffect(() => {
    if (!session || session?.error === "RefreshAccessTokenError") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/event-types`,
      }); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-neutral-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="h-6 mx-auto" src="/calendso-logo-white-word.svg" alt="Cal.com Logo" />
        <h2 className="mt-6 text-3xl font-bold text-center font-cal text-neutral-900">Sign In SSO</h2>
      </div>
    </div>
  );
}

export default HomePage;
