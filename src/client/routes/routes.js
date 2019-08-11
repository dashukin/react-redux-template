/**
 * Routes configuration
 * @see https://github.com/faceyspacey/redux-first-router/blob/master/docs/connectRoutes.md
 */

/**
 * In case any specific action should be dispatched from the component level
 * it should be dispatched from thunk method coming with route object
 */

export const routesMap = {
  HOME: {
    path: '/',
    // eslint-disable-next-line no-unused-vars
    thunk: async (dispatch, getState) => {
      const action = {
        type: 'HOME_SPECIFIC_ACTION_EXAMPLE',
      };
      dispatch(action);
    },
  },
};
