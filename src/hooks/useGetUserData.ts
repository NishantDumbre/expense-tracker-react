import { GET_RECORD_DATA_URL, GET_USER_DATA_URL } from "../utils/constants";
import { fetchUserData } from "../utils/redux/userSlice";
import { fetchRecordsDetails } from "../utils/redux/recordsSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../utils/redux/appStore";

const useGetUserData = () => {
  const dispatch = useDispatch();
  const token = useSelector((store: StoreState) => store.user.token);

  const getUserData = async () => {
    const userDataPromise = axios.get(GET_USER_DATA_URL, {
      headers: { Authorization: token },
    });

    const recordsDataPromise = axios.get(GET_RECORD_DATA_URL, {
      headers: { Authorization: token },
    });

    const [userData, recordsData] = await Promise.all([
      userDataPromise,
      recordsDataPromise,
    ]);

    dispatch(fetchUserData(userData.data));
    dispatch(fetchRecordsDetails(recordsData.data));
  };

  return getUserData;
};

export default useGetUserData;
