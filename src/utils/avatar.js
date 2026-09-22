export const getAvatarUrl = (seed) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed || "user")}`;

export const createRandomAvatar = (role = "user") => {
  const randomPart =
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return getAvatarUrl(`${role}-${randomPart}`);
};
