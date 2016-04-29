// Constants
// export const constants = { }

// Action Creators
// export const actions = { }

// Reducer
export const initialState = {
  isFetching: false,
  lists: [{
    'id': '57215d1a2dda56884418e52a',
    'emailAddresses': [
      'sjobs@me.com',
      'angelaveatch@hotmail.com',
      'alex@spamsux.com'
    ],
    'posts': [{
      'emailAddress': 'sjobs@me.com',
      'status': 'invalid'
    }, {
      'emailAddress': 'angelaveatch@hotmail.com',
      'status': 'spamtrap'
    }, {
      'emailAddress': 'alex@spamsux.com',
      'status': 'valid'
    }],
    'status': 'processed',
    'report': {
      'qualityScore': 0,
      'spamtrap': 1,
      'role-based': 0,
      'accept all': 0,
      'unknown': 0,
      'invalid': 1,
      'valid': 1,
      'total': 3
    }
  }, {
    'id': '57215d8f2dda56884418e52b',
    'emailAddresses': [
      'sjobs@me.com',
      'angelaveatch@hotmail.com',
      'alex@spamsux.com'
    ],
    'posts': [{
      'emailAddress': 'sjobs@me.com',
      'status': 'invalid'
    }, {
      'emailAddress': 'angelaveatch@hotmail.com',
      'status': 'spamtrap'
    }, {
      'emailAddress': 'alex@spamsux.com',
      'status': 'valid'
    }],
    'status': 'processed',
    'report': {
      'qualityScore': 0,
      'spamtrap': 1,
      'role-based': 0,
      'accept all': 0,
      'unknown': 0,
      'invalid': 1,
      'valid': 1,
      'total': 3
    }
  }]
}
export default function (state = initialState, action) {
  switch (action.type) {
    default: return state
  }
}
