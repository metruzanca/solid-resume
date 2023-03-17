import { Component, createEffect } from "solid-js";
import { GH_LOCALSTORAGE_KEY } from "../lib/constants";
import { GhApp } from "../lib/ghAppContext";


export async function POST() {
  
}

const OAuth: Component<{ onOAuthComplte: (data: GhApp ) => void }> = (props) => {

  createEffect(() => {
    const params = new URLSearchParams(location.search)

    if (params.has('access_token')) {
      const ghData: GhApp = {
        token: params.get('access_token') || undefined,
        scope: params.get('scope') || undefined,
        token_type: params.get('token_type') || undefined,
      }
      props.onOAuthComplte(ghData)
      localStorage.setItem(GH_LOCALSTORAGE_KEY, JSON.stringify(ghData))
    }

    if (params.has('code')) {

    }
  })

  return (
    <div>
      Loading...
    </div>
  )
};

export default OAuth
