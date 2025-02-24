import { create } from 'zustand'
const useMyStor = create(() => {
return{
    token: "",
    user: null
}
});
export default useMyStor;
