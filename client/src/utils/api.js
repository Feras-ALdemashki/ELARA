// Base URL for backend API
export const BASE_URL = "http://localhost:8000/api"; //  to be changed to deployed URL later

// Income endpoints
export const INCOME = {
  ADD: `${BASE_URL}/income/addIncome`,
  GET_ALL: `${BASE_URL}/income/getIncome`,
  DELETE: (id) => `${BASE_URL}/income/${id}`,
  GET_EXCEL: `${BASE_URL}/income/getExcelFile`,
};

// Expense endpoints
export const EXPENSE = {
  ADD: `${BASE_URL}/expenses/addExpenses`,
  GET_ALL: `${BASE_URL}/expenses/getExpenses`,
  DELETE: (id) => `${BASE_URL}/expenses/${id}`,
  GET_EXCEL: `${BASE_URL}/expenses/getExcelFile`,
};

// Dashboard endpoint
export const DASHBOARD = {
  GET: `${BASE_URL}/dashboard`,
};

// Auth endpoints
export const AUTH = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  GET_USER: `${BASE_URL}/auth/getUser`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};
