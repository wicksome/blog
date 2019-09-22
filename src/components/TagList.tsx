import React, { useEffect } from "react"
import { go, filter } from "fxjs2"

interface Props {
  tags: string[]
}

const TagList: React.SFC<Props> = ({ tags }) => {
  return <div id="tags">{tags.length !== 0 && tags.join(",")}</div>
}

export default TagList
