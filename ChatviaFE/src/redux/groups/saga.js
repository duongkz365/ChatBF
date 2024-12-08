// src/redux/GROUP/saga.js

import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_REQUEST,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  GET_GROUP_BY_ID_REQUEST,
  UPDATE_GROUP_REQUEST,
} from "../actionTypes";
import { fetchGroupFailure, fetchGroupSuccess } from "./action";

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
};
// Hàm gọi API lấy danh sách GROUP
function* fetchGroups() {
  try {
    const response = yield call(fetch, "https://localhost:7098/api/Group", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });

    if (!response.ok) {
      // If the response status is not OK, throw an error
      throw new Error(`Failed to fetch groups: ${response.statusText}`);
    }

    const data = yield response.json();
    yield put(fetchGroupSuccess(data));
  } catch (e) {
    yield put(fetchGroupFailure(e.message));
  }
}

function* createGroups({ payload }) {
  const memberIds = payload?.payload?.members?.map((member) => member.id);
const uniqueMemberIds = [...new Set(memberIds)];

console.log(uniqueMemberIds);

  try {
    const response = yield call(
      fetch,
      "https://localhost:7098/api/Group/create-group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload?.payload?.name,
          members: uniqueMemberIds,
          description: payload?.payload.desc
        }),
      }
    );
    if (!response.ok) {
      // Attempt to parse the error response as JSON, or fallback to text
      let errorData;
      try {
        errorData = yield response.json(); // Try to read as JSON
        console.error("Error response JSON:", errorData);
      } catch {
        errorData = yield response.text(); // Fallback to text
        console.error("Error response text:", errorData);
      }
      // Optionally, throw an error to handle it in your saga
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // If the response is OK, parse it as JSON
    const data = yield response.json();
    console.log("data", data);

    // Dispatch success action
    yield put(fetchGroupSuccess());
    yield put({ type: FETCH_GROUP_REQUEST });
  } catch (e) {
    // Handle error, optionally dispatch failure action
    console.log("Error in createGroups saga:", e);
    yield put(fetchGroupFailure(e));
  }
}

// Saga function
  function* handleGetGroupById(action) {
    try {
      const response = yield call(fetch, `https://localhost:7098/api/Group/${action.payload}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch group: ${response.status} - ${response.statusText}`);
      }
  
      const group = yield response.json(); // Parse JSON response
  
      yield put(getGroupByIdSuccess(group)); // Dispatch success action with group data
    } catch (error) {
      yield put(getGroupByIdFailure(error.message)); // Dispatch failure action with error message
    }
  }

function* deleteGroups(payload) {
  console.log("Payload for deleteGroups:", payload); // Log kiểm tra payload

  try {
    const response = yield call(
      fetch,
      "https://localhost:7098/api/Group/delete-group",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupName : payload.payload }),
      }
    );

    // Kiểm tra status HTTP
    if (!response.ok) {
      const errorData = yield response.json(); // Parse lỗi từ server
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = yield response.json();

    // Dispatch action cập nhật danh sách nhóm sau khi xóa thành công
    yield put({ type: "FETCH_GROUP_REQUEST" }); // Gửi yêu cầu fetch nhóm mới

    // Ghi log thông báo
    console.log("Delete success:", data.message);
  } catch (e) {
    // Log lỗi
    console.error("Error deleting group:", e.message);

    // Dispatch action thất bại nếu cần
    yield put({ type: "DELETE_GROUP_FAILURE", payload: e.message });
  }
}

function* updateGroup({ payload }) {
  try {
    // Ensure member IDs are unique
    const uniqueMemberIds = [...new Set(payload.members.map((member) => member.id))];

    // Call the API
    const response = yield call(fetch, `https://localhost:7098/api/Group/${payload.groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: payload.groupId, // Group ID from payload
        members: uniqueMemberIds, // Unique member IDs
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = yield response.json(); // Parse as JSON
      } catch {
        errorData = yield response.text(); // Fallback to text
      }
      throw new Error(
        `Failed to update group: ${response.status} - ${errorData || "Unknown error"}`
      );
    }

    // Parse the successful response
    const data = yield response.json();
    console.log("Group updated successfully:", data);

    // Dispatch success action
    yield put({ type: "UPDATE_GROUP_SUCCESS", payload: data });

    // Optionally refetch the updated group list
    yield put({ type: "FETCH_GROUP_REQUEST" });
  } catch (error) {
    console.error("Error updating group:", error);
    yield put({ type: "UPDATE_GROUP_FAILURE", payload: error.message });
  }
}

// function* cancelGROUPs({payload: {userId}}) {
//    try {
//      const response = yield call(fetch, 'https://localhost:7098/api/GROUP/cancel', {
//          method: 'POST',
//          headers: {
//              'Content-Type': 'application/json',
//              Authorization: `Bearer ${getCookie("token")}`,
//              'userId': userId
//          },
//          body: JSON.stringify(),
//      });

//      const data = yield response.json();
//      yield put(fetchGROUPRequest());
//      yield take(FETCH_GROUP_SUCCESS);
//      yield console.log(data.message);
//    }catch(e){
//      // yield put(fetchGROUPFailure(e.message));
//      yield console.log(e.message)
//    }
//  }

//  function* refuseGROUPs({payload: {userId}}) {
//   try {
//     const response = yield call(fetch, 'https://localhost:7098/api/GROUP/refuse', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${getCookie("token")}`,
//             'userId': userId
//         },
//         body: JSON.stringify(),
//     });

//     const data = yield response.json();
//     yield put(fetchGROUPRequest());
//     yield take(FETCH_GROUP_SUCCESS);
//     yield console.log(data.message);
//   }catch(e){
//     // yield put(fetchGROUPFailure(e.message));
//     yield console.log(e.message)
//   }
// }

// function* deleteGROUPs({payload: {userId}}) {
//   try {
//     const response = yield call(fetch, 'https://localhost:7098/api/GROUP/delete', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${getCookie("token")}`,
//             'userId': userId
//         },
//         body: JSON.stringify(),
//     });

//     const data = yield response.json();
//     yield put(fetchGROUPRequest());
//     yield take(FETCH_GROUP_SUCCESS);
//     yield console.log(data.message);
//   }catch(e){
//     // yield put(fetchGROUPFailure(e.message));
//     yield console.log(e.message)
//   }
// }

// Watcher Saga
export function* watchFetchGroup() {
  yield all([
    takeLatest(FETCH_GROUP_REQUEST, fetchGroups),
    takeLatest(CREATE_GROUP_REQUEST, createGroups),
    takeLatest(DELETE_GROUP_REQUEST, deleteGroups),
    takeLatest(GET_GROUP_BY_ID_REQUEST, handleGetGroupById),
    takeLatest(UPDATE_GROUP_REQUEST, updateGroup),
    // takeLatest(REFUSE_GROUP_REQUEST, refuseGROUPs),
    // takeLatest(DELETE_GROUP_REQUEST, deleteGROUPs)
  ]);
}
