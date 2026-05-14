export const isProfileComplete = (user) => {
  if (!user) return false;

  return (
    user.first_name?.trim() &&
    user.last_name?.trim() &&
    user.username?.trim() &&
    user.bio?.trim()
  );
};