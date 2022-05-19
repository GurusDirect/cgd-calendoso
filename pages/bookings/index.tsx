import { getSession } from "@lib/auth";

function RedirectPage() {
  return null;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/api/auth/signin/cloud-gurus" } };
  }

  return { redirect: { permanent: false, destination: "/bookings/upcoming" } };
}

export default RedirectPage;
