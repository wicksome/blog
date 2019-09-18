import React, { useEffect } from "react"
import { Global } from "@emotion/core"

const src = "https://utteranc.es/client.js"

export const Utterances = ({ repo }) => {
  const rootElm = React.createRef()

  useEffect(() => {
    const utterances = document.createElement("script")
    const utterancesConfig = {
      src,
      repo,
      "issue-term": "pathname",
      label: "🏷",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  }, [])

  return <div className="utterances" ref={rootElm} />
}

// Based on prism.js okaidai theme
export const UtterancesStyle = () => (
  <Global
    styles={{
      ".utterances": {
        maxWidth: "950px",
      },
    }}
  />
)
