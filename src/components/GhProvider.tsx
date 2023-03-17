import { createContext, createSignal, ParentComponent } from "solid-js";

export type GhApp = {
  token?: string
  scope?: string
  token_type?: string
}
// https://www.solidjs.com/guides/typescript#context
export const makeGhContext = () => {
  const [gh, setGh] = createSignal<GhApp>({})
  return [gh, {
    login(data: GhApp) {
      setGh(data);
    },
    logout() {
      setGh({})
    },
  }] as const;
};
type GhContextType = ReturnType<typeof makeGhContext>;

const initialContext = makeGhContext()

// From the docs
// "This is a dangerous assumption; it would be safer to actually provide a default argument to createContext so that the context is always defined."
export const GhContext = createContext<GhContextType>(initialContext);

const GhProvider: ParentComponent = (props) => {
  return (
    <GhContext.Provider value={initialContext}>
      {props.children}
    </GhContext.Provider>
  )
}

export default GhProvider
