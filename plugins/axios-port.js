import { setClient } from "~/services/api-client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app, store }) => {
    setClient(app.$axios);
}