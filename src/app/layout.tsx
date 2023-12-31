import "./globals.css";
import localFont from "next/font/local";
import StyledComponentsRegistry from "@/src/lib/registry";
import { SearchProvider } from "../context/searchContext";


const myFont = localFont({
  src: [
    {
      path: "../../src/fonts/PTSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "../../src/fonts/PTSans-Bold.ttf", weight: "700", style: "bold" },
  ],
  display: "swap",
});

export const metadata = {
  title: "Marvel Search App",
  description: "Marvel Search App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {/*<header className="w-full flex justify-center">
          <Image src={Logo} width={200} height={200} />
        </header>*/}
        <SearchProvider>
          <StyledComponentsRegistry>
           {children}
          </StyledComponentsRegistry>
        </SearchProvider>
      </body>
    </html>
  );
}
