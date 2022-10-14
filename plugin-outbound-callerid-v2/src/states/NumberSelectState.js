import {Manager} from "@twilio/flex-ui";

const UPDATE_DIALER_NUMBER = "UPDATE_NUMBER";
const CLEAR_DIALER_NUMBER = "CLEAR_NUMBER";
const SET_CALLER_IDS = "SET_CALLER_IDS";

const initialState = {
  callerIds: [],
  phoneNumber: undefined
};

export class Actions {
  static updateNumber = (phoneNumber) => ({
    type: UPDATE_DIALER_NUMBER,
    phoneNumber,
  });
  static clearNumber = () => ({
    type: CLEAR_DIALER_NUMBER
  });
  static setCallerIds = (callerIds) => ({
    type: SET_CALLER_IDS,
    callerIds,
  });



}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIALER_NUMBER: {
      const worker = Manager.getInstance().workerClient;
      worker.setAttributes({...worker.attributes, lastSelectedCallerId:action.phoneNumber});
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };
    }
    case CLEAR_DIALER_NUMBER: {
      const worker = Manager.getInstance().workerClient;
      worker.setAttributes({...worker.attributes, lastSelectedCallerId:null});
      return {
        ...state,
        phoneNumber: undefined
      };
    }
    case SET_CALLER_IDS: {
      return {
        ...state,
        callerIds: action.callerIds
      }
    }
    default:
      return state;
  }
}
