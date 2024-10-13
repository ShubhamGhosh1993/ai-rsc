"use client";

import { useState } from "react";
import { streamComponent } from "./actions";

export default function Page() {
  const [component, setComponent] = useState<React.ReactNode>();
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setComponent(await streamComponent(prompt));
        }}>
        <input
          className="text-black"
          type="text"
          name=""
          id=""
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button>Stream Component</button>
      </form>
      <div>{component}</div>
    </div>
  );
}
