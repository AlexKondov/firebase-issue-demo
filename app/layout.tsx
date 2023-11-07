"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html>
      <head>
        <title>Tavern</title>
        <meta property="og:title" content="Writers' Tavern" />
        <meta
          property="og:description"
          content="A place to practice your writing skills and draw inspiration from others."
        />
        <meta property="og:url" content={`https://writerstavern.io`} />
        <meta property="og:image" content="https://writerstavern.io/api/og" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <style jsx global>{`
          .auth-form > div {
            box-shadow: none;
            border: 2px solid black;
            border-radius: 5px;
          }
          .auth-form h1 {
            font-size: 1.5rem;
            text-align: center;
          }
          .auth-form h1,
          .auth-form > div > form > div > div > label,
          .auth-form > div > form > div > div > input,
          .auth-form > div > form > div > p {
          }

          .auth-form > div > form > div > div > button[type="submit"],
          .auth-form
            > div
            > form
            > div
            > div
            > button.firebaseui-id-secondary-link {
            background: black;
            box-shadow: none;
            transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
            color: white;

            &:hover {
              transform: translate(-6px, -6px);
              box-shadow: 6px 6px #da3fe8;
              background: black;
            }
          }

          .auth-form
            .firebaseui-textfield.mdl-textfield
            .firebaseui-label::after {
            background-color: black;
          }

          .auth-form .firebaseui-textfield.mdl-textfield .firebaseui-label {
          }

          .auth-form a {
            color: black;
          }
        `}</style>
      </head>
      <body>
        <ProgressBar
          options={{ showSpinner: false }}
          height="3px"
          color="black"
        />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
