const base_url = import.meta.env.VITE_API_BASE_URL;

export const registerUserUrl = () => `${base_url}/auth/register`;

export const loginUserUrl = () => `${base_url}/auth/login`;
