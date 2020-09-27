import { 
  COMMAND_STREAM
} from './actions';

const initialState = {
  mentalcommand: {
    kind: null,
    magnitude: null
  }
}

export function commandStreamReducer(state = initialState, action) {
  switch (action.type) {
    case COMMAND_STREAM:
      return Object.assign({}, state, {
        mentalcommand: action.payload
      })
    default:
      return state;
  }
}
