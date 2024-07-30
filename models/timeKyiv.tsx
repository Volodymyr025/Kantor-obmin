const currentServerTime = new Date();
export const kyivTime = new Date(
  currentServerTime.getTime() + 3 * 60 * 60 * 1000
).toISOString();
