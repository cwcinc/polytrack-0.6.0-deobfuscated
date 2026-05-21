// t.id, t.trackMetadata, t.trackData, t.thumbnail, t.saveTime, t.backup

const SORTING_FUNCTIONS = new Map([
  ["custom", (a, b) => b.orderId - a.orderId],
  ["name", (a, b) => a.trackMetadata.name.localeCompare(b.trackMetadata.name)],
  ["author", (a, b) => a.trackMetadata?.author?.localeCompare(b.trackMetadata?.author) ?? 1],
  ["lastModified", (a, b) => b.trackMetadata.lastModified - a.trackMetadata.lastModified],
  ["saveTime", (a, b) => b.saveTime - a.saveTime],
  ["id", (a, b) => b.id - a.id],
  ["environment", (a, b) => b.trackData.environment - a.trackData.environment]
]);