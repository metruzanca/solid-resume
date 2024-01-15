import { Component } from "solid-js";

const Landing: Component = () => {

  return (
    <div class="flex items-center justify-center h-screen w-screen">
      <div class="prose">
        <h1>Solid Resume</h1>
        <form onSubmit={e => {
          e.preventDefault()
          const fd = new FormData(e.target as HTMLFormElement)
          const username = fd.get('username')
          if (username) location.href = `/${username}`
        }}>
          <input
            name="username"
            placeholder="Github Username"
            type="text"
          />
          <button class="btn btn-accent btn-sm">Go</button>
        </form>
      </div>
    </div>
  )
}

export default Landing
