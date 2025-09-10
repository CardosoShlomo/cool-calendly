"use client";

import { forwardRef, useRef } from "react";
import Container from "./Container";

/**
 * @param {{
 *  type?: string,
 *  placeholder?: string,
 *  value: string,
 *  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 *  style?: React.CSSProperties,
 *  onFocus?: () => void,
 *  onBlur?: () => void,
 *  autoComplete?: string,
 *  required?: boolean,
 *  icon?: React.ReactNode
 * }} props
 */
export default forwardRef(function TextField(
  {
    type = "text",
    placeholder = "",
    value,
    onChange,
    style = {},
    onFocus,
    onBlur,
    autoComplete,
    required = false,
    icon,
  },
  ref
) {
  const internalRef = useRef();
  const r = ref || internalRef;

  return (
    <Container
      style={{
        width: 200,
        borderRadius: 100,
        fontWeight: 500,
        padding: 10,
        display: "flex",
        alignItems: "center",
        position: "relative", // needed for icon positioning
        ...style,
      }}
      onClick={() => r.current && r.current.focus()}
    >
      <input
        ref={r}
        type={type}
        name={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        style={{
          border: "none",
          outline: "none",
          cursor: "none",
          background: "transparent",
          fontWeight: "inherit",
          color: "inherit",
          width: "100%",
          paddingRight: icon ? 28 : 0, // leave space for icon if present
        }}
      />
      {icon && (
        <div
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      )}
    </Container>
  );
});
