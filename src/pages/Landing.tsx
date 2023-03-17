import { Component, useContext } from "solid-js";
import { github } from "../lib/api";
import { GhAppContext } from "../lib/ghAppContext";

const Landing: Component = () => {
  const ghApp = useContext(GhAppContext)

  return (
    <div>
      <h1>Solid Resume</h1>

      {ghApp?.().token && (
        <h3>You are logged in to github!</h3>
      )}

      <button
        onClick={github.authorizeApp}
      >Enable Editing</button>

    </div>
  )
}

export default Landing
