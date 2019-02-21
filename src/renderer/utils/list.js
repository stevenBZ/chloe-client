export function resetId(list) {
  list.forEach((i, index) => {
    i.id = index + 1
  })
}