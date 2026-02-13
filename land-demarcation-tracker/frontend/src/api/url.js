const base_url = import.meta.env.VITE_API_BASE_URL;

export const registerUserUrl = () => `${base_url}/auth/register`;

export const loginUserUrl = () => `${base_url}/auth/login`;

export const logoutUserUrl = () => `${base_url}/auth/logout`;

export const getUserUrl = () => `${base_url}/auth/get-user`;

export const getCircles = () => `${base_url}/plots/get-circles`;

export const getOfficers = () => `${base_url}/plots/get-officers`;

export const dashboardSummaryUrl = () => `${base_url}/plots/dashboard-summary`;

export const getAllPlotsUrl    = () => '/plots/get-plots';

export const registerPlotUrl   = () => '/plots';

export const updatePlotUrl     = () => '/plots/update-plot';

export const getDemarcationLogsUrl = () => 'demarcation/get-logs';

export const getUnresolvedDuplicatesUrl = () => '/plots/get-duplicates-unresolved'

