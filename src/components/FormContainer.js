"use client";

import Container from "./Container";

/**
 * @param {{
 *   children: React.ReactNode,
 *   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
 *   style?: React.CSSProperties,
 *   centered?: boolean
 * }} props
 */
export default function FormContainer({ children, onSubmit, style = {}, centered = true }) {
  return (
    <Container
      style={{
        borderRadius: 20,
        ...style,
      }}
    >
      <form onSubmit={onSubmit} style={{
        width: 400,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        ...(centered ? { justifyContent: "center", alignItems: "center" } : {}),
       }}>
        {children}
      </form>
    </Container>
  );
}
