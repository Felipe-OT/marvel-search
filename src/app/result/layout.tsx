import StyledComponentsRegistry from "@/src/lib/registry";
import PageWrapper from "@/src/components/wrapper/page-wrapper";
import { CharacterProvider } from "@/src/context/characterContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CharacterProvider>
      <StyledComponentsRegistry>
        <PageWrapper>{children}</PageWrapper>
      </StyledComponentsRegistry>
    </CharacterProvider>
  );
}
