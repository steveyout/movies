import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  notifications: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, notifications } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      notifications,
    };
  },
  LOGIN: (state, action) => {
    const { user, notifications } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      notifications,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    notifications: null,
  }),
  REGISTER: (state, action) => {
    const { user, notifications } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      notifications,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.post('/api/account/dashboard');
          const { user, notifications } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              notifications,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              notifications: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            notifications: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password, captcha) => {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
      'h-captcha-response': captcha,
    });
    const { accessToken, user, notifications } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        notifications,
      },
    });
  };

  const register = async (email, password, firstName, lastName, username, captcha) => {
    const response = await axios.post('/api/auth/register', {
      email,
      password,
      firstName,
      lastName,
      username,
      'h-captcha-response': captcha,
    });
    const { accessToken, user, notifications } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
        notifications,
      },
    });
  };

  const logout = async () => {
    const response = await axios.post('/api/auth/logout');
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  //update
  const update = async (user) => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: true,
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
