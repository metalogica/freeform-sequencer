// Action Types
export const COMMAND_STREAM = 'COMMAND_STREAM';

// Action Creators
export function commandStream(mentalcommand) {
  return {
    type: COMMAND_STREAM,
    payload: mentalcommand
  }
}
