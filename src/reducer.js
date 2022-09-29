export const initialState = {
  user: null,
  isAuthenticated: null,
  alertMsg: '',
  open: false,
  severity: '',
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: true,
      };
    case 'LOGOUT': {
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'LOADUSER': {
      return {
        ...state,
        isAuthenticated: true,
        user: JSON.parse(localStorage.getItem('user')),
      };
    }
    case 'SET_ALERT': {
      return {
        ...state,
        open: true,
        severity: action.severity,
        alertMsg: action.alertMsg,
      };
    }
    case 'CLOSE_ALERT': {
      return {
        ...state,
        open: false,
        severity: '',
        alertMsg: '',
      };
    }
  }
};

export default reducer;
