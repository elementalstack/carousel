const config = {
  type: "table",
  name: "packages",
  message: "Choose your workout plan for next week",
}

const columns = [
  {
    name: "Major",
    value: "major"
  },
  {
    name: "Minor",
    value: "minor"
  },
  {
    name: "Patch",
    value: "patch"
  },
  {
    name: "None",
    value: undefined
  }
]

export function createTableConfig(packageNames: string[]) {

  const rows = packageNames.map((name, index) => ({
    name,
    value: index
   }))

  return {
    ...config,
    columns,
    rows
  }
}



