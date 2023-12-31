"use client";

import { useEffect, useRef, useState } from "react";
import { EmailAuthProvider, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import "firebaseui/dist/firebaseui.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import { auth } from "../../lib/firebase";

function getRandomTavernLocation() {
  const tavernLocations = [
    "table by the small window",
    "table by the fireplace",
    "table in the back",
    "chair at the bar",
  ];

  const location =
    tavernLocations[Math.floor(Math.random() * tavernLocations.length)];

  return location;
}

function getButtonText(isLoading: boolean, available: boolean) {
  if (isLoading) {
    return "Checking...";
  }

  if (typeof available === "boolean" && !available) {
    return "Name is taken. Try another one!";
  }

  return "Save name";
}

export default function Auth() {
  const router = useRouter();
  const [firebaseui, setFirebaseui] = useState<any>(null);
  const [user, setUser] = useState<null | User>(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 500);
  // TODO: we put this in state to retain the initial value
  const [location] = useState(() => getRandomTavernLocation());
  const elementRef = useRef(null);

  const uiConfig = {
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any) => {
        if (authResult.additionalUserInfo.isNewUser) {
          setShowNameForm(true);
          return;
        }

        router.push("/tavern");
      },
    },
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
  };

  useEffect(() => {
    // Firebase UI only works on the Client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering.
    setFirebaseui(require("firebaseui"));
  }, []);

  useEffect(() => {
    if (firebaseui === null) {
      return;
    }

    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    if (uiConfig.signInFlow === "popup") {
      firebaseUiWidget.reset();
    }

    // We track the auth state to reset firebaseUi if the user signs out.
    let unregisterAuthObserver = () => {};

    unregisterAuthObserver = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser && user) {
        firebaseUiWidget.reset();
      }
      setUser(firebaseUser);
    });

    // Render the firebaseUI Widget.
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseui, uiConfig]);

  const createUserAccount = async (name: string) => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users`,
        {
          name,
          email: user?.email,
          firebase_id: user?.uid,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        router.push("/tavern");
      });
  };

  const { data, isFetched } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      const token = await user?.getIdToken();

      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users/${user?.uid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  useEffect(() => {
    if (user && isFetched && !data?.name) {
      // The user doesn't have an account yet
      setShowNameForm(true);
    }
  }, [user, data, isFetched]);

  const nameCheck = useQuery({
    queryKey: ["name", debouncedName],
    queryFn: async () => {
      const token = await user?.getIdToken();

      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users/names/${debouncedName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  return (
    <main className="flex flex-col py-2 mx-auto max-w-2xl px-4 md:px-0">
      <div className="grid mt-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-4 text-center w-full">
            {showNameForm ? "One more thing..." : "Glad you made it!"}
          </h1>
          {/** Interesting example of suppressing hydration warning */}
          <p className="text-xl mb-10 text-center" suppressHydrationWarning>
            {showNameForm
              ? `How should we call you here? This name will be visible to the other patrons.`
              : `Sit on a ${location} and join the conversation.`}
          </p>
          {showNameForm ? (
            <>
              <input
                className="w-full text-center mt-16 mb-4 text-xl focus:outline-none border rounded border-black py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="block cursor-pointer w-full bg-black text-white py-2 text-xl rounded shadow-solid transition-all"
                disabled={
                  nameCheck.isLoading || !name || !nameCheck.data?.available
                }
                onClick={() => createUserAccount(name)}
              >
                {getButtonText(nameCheck.isLoading, nameCheck.data?.available)}
              </button>
            </>
          ) : null}
          <div
            className={`auth-form w-full ${showNameForm ? "invisible" : ""}`}
            ref={elementRef}
          />
        </div>
      </div>
    </main>
  );
}
