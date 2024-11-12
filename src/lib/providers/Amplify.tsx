"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs, {
  ssr: true,
});

export default function ConfigureAmplifyClientSide() {
  return null;
}
