"use client"

import { ListItem } from "../src/components/atoms/list-item/list-item"

export default function SyntheticV0PageForDeployment() {
  return (
    <div className="p-8">
      <ul className="space-y-2">
        <ListItem title="Example item" isChecked={true} />
        <ListItem title="Another item" isChecked={false} />
      </ul>
    </div>
  )
}
