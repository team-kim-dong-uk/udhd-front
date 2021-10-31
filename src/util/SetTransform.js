import { createTransform } from "redux-persist";
import api from "../api/client";

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        // convert mySet to an Array.
        console.log(inboundState)
        return { ...inboundState };
    },
    // transform state being rehydrated
    (outboundState, key) => {
        console.log(outboundState)
        //typeof window !== 'undefined' && window.localStorage.setItem('refreshToken', action.payload.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${outboundState.data.accessToken}`;
        // convert mySet back to a Set.
        return { ...outboundState };
    },
    // define which reducers this transform gets called for.
    { whitelist: ['auth'] }
);

export default SetTransform;