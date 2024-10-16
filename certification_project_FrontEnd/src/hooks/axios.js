import axios from "axios";
import { useDispatch } from "react-redux";
import { updated } from '../store/loading/loadingSlice';
import { showSnackbar } from '../store/notification/messageSlice';

export default function useAxios() {
    const dispatch = useDispatch();
    
    async function customAxios(props) {
        dispatch(updated(true)); 
        try {
            const result = await axios({
                method: props.method,
                url: props.url,
                headers: {
                    ...props?.headers,
                },
                data: props?.data,
                withCredentials: true
            });
            const { message, status, open } = result.data;
            dispatch(showSnackbar({ message, type: 'success', open }));

            return result.data; 
          
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
          const errorOpen = error.response?.data?.open 
          dispatch(showSnackbar({ message: errorMessage, type: 'error', open: errorOpen }));
          
          throw error;
        } finally {
            dispatch(updated(false)); 
        }
    }
    
    return { customAxios };
}
