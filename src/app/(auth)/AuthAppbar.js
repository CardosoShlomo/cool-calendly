import Container from "../../components/Container";

export default function AuthAppbar({ children }) {
  return <Container style={{
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
    gap: 10,
  }}>
    <div style={{width: 15}}/>
    <div style={{ width: "100%", height: "100%" }}>I.E.P.O.K</div>
    {children}
  </Container>
}