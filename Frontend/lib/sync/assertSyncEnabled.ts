export function assertSyncEnabled() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Syncing is disabled in production");
  }

  if (process.env.ENABLE_DATA_SYNC !== "true") {
    throw new Error("Syncing is disabled");
  }
}
