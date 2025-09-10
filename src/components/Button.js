import Container from "./Container";

/**
 * @param {{ children: React.ReactNode, onClick?: () => void, style?: React.CSSProperties, type?: "button" | "submit" | "reset" }} props
 */
export default function Button({ children, onClick, style, type = "button" }) {
  return (
    <Container
      style={{
        padding: "10px 20px",
        borderRadius: 30,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
      {/* <button type={type} style={{
        all: "unset",
        width: "100%",
        height: "100%",
        textAlign: "center",
      }}>
      </button> */}
    </Container>
  );
}