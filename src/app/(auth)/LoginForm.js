"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import GoogleAuth from "./GoogleAuth";
import FormContainer from "@/components/FormContainer";
import TextField from "@/components/TextField";
import { supabase } from "@/utils/supabase/browser";

/**
 * @param {{ children: string }} props
 */
export default function LoginForm({ children }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { data, error } = children == "Login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password});

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      alert("Please confirm your email before logging in.");
    } else {
      alert(error.message);
    }
    return;
  }

  if (data?.session) {
    router.push("/scheduling");
  } else if (data?.user && !data?.session) {
    alert("Check your email for a confirmation link!");
  }
};


  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{children}</h2>
      <br/>
      <TextField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div style={{ height: 5 }}/>
      <Button type="submit">Continue</Button>
      <br/>
      <GoogleAuth>{children}</GoogleAuth>
    </FormContainer>
  );
}
