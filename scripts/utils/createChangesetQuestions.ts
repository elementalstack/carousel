const config = {
  type: "table",
  name: "packages",
  message: "Choose the package and the desired version to update",
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

export function createChangesetQuestions(packageNames: string[]) {

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



