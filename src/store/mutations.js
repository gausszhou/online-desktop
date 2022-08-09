import { Message } from "element-ui"
export default {
  setMessage(state, payload) {
    state.message = payload;
    Message({
      message: payload,
      type: 'error'
    })
  },
};
