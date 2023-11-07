import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@firebase/auth";
import axios from "axios";
import { useQuery } from "react-query";
import { auth } from "../lib/firebase";

enum SignedInStatus {
  Unknown,
  Authenticated,
  Anonymous,
}

export default function useAuthentication(redirectAnonymous = true) {
  // Local signed-in state.
  const [isSignedIn, setIsSignedIn] = useState(SignedInStatus.Unknown);
  const [authenticatedUser, setAuthenticatedUser] = useState<null | User>(null);
  const router = useRouter();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    let unregisterAuthObserver = () => {};

    if (auth) {
      unregisterAuthObserver = auth.onAuthStateChanged((user) => {
        const status = user
          ? SignedInStatus.Authenticated
          : SignedInStatus.Anonymous;

        setIsSignedIn(status);
        setAuthenticatedUser(user);
      });
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, []);

  const account = useQuery({
    queryKey: ["user", authenticatedUser?.uid],
    queryFn: async () => {
      const token = await authenticatedUser?.getIdToken();

      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  if (isSignedIn === SignedInStatus.Unknown) {
    return { user: null, account: null };
  }

  if (isSignedIn === SignedInStatus.Anonymous && redirectAnonymous) {
    router.push("/auth");
    return { user: null, account: null };
  }

  if (
    isSignedIn === SignedInStatus.Authenticated &&
    account?.isFetched &&
    !account?.data?.name
  ) {
    return { user: authenticatedUser, account, userState: "no-account" };
  }

  return { user: authenticatedUser, account };
}
