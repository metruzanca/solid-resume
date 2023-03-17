import { Component, createEffect, onMount, useContext } from "solid-js";
import { GhApp, GhContext } from "~/components/GhProvider";
import { GH_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { github } from "../lib/api";

const Landing: Component = () => {
  const [gh, actions] = useContext(GhContext)

  onMount(() => {
    const data = localStorage.getItem(GH_LOCAL_STORAGE_KEY)
    if (data) {
      const appData = JSON.parse(data)
      actions.login(appData)
    }
  })
    
  createEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    if (code) {
      github.getAccessToken(code)
      .then(search => {
        const params = new URLSearchParams(search)
        const ghApp: GhApp = {
          token: params.get('access_token') || undefined,
          scope: params.get('scope') || undefined,
          token_type: params.get('token_type') || undefined,
        }
        actions.login(ghApp)

        localStorage.setItem(GH_LOCAL_STORAGE_KEY, JSON.stringify(ghApp))
        location.href = '/'
      })
    }
  })

  return (
    <div>
      <h1>Solid Resume</h1>

      {gh()?.token ? (
        <h3>You are logged in to github!</h3>
      ) : (
        <button
          class="bg-sky-200 rounded-md px-2 hover:bg-sky-300 active:bg-sky-400"
          onClick={github.authorizeApp}
        >Github OAuth</button>
      )}


    </div>
  )
}

export default Landing
