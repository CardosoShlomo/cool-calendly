import Link from "next/link";
import Container from "./Container";

/**
 * @param {{ children: React.ReactNode, href: string, style?: React.CSSProperties }} props
 */
export default function LinkButton({ children, href, style }) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", cursor: "none" }}>
      <Container
        style={{
          padding: "10px 20px",
          borderRadius: 30,
          ...style,
        }}
      >
        {children}
      </Container>
    </Link>
  );
}
