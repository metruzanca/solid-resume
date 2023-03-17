import { Accessor, createContext } from "solid-js";

export type GhApp = {
  token?: string
  scope?: string
  token_type?: string
}

export const GhAppContext = createContext<Accessor<GhApp>>();
