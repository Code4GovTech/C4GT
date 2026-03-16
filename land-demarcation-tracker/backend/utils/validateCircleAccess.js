export const validateCircleAccess = (user, plotCircle) => {
    return user.role === 'admin' || user.circle === plotCircle;
};
  