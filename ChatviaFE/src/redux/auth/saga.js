// src/redux/auth/saga.js
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { loginUserSuccess, apiError, logoutUserSuccess } from './actions';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './constants';



// API login
function* login({ payload: { userName, passwordHash, navigate } }) {
    
    try {
        const response = yield call(fetch, 'https://localhost:7266/api/User/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, passwordHash }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log("Token nhận được:", data); // In token nhận được

        // Lưu token vào cookie với thời gian hết hạn 29 phút (29 * 60 giây)
        document.cookie = `token=${data.token}; path=/; max-age=${29 * 60}`;
        // Dispatch action thành công nếu cần
        yield put(loginUserSuccess(data.token));

        navigate('/dashboard');
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error.message);
        
    }
}


function* register({ payload: { userName, passwordHash, email, navigate } }) {
    
    try {

        const response = yield call(fetch, 'https://localhost:7266/api/User/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, passwordHash, email }),
        });

        let data;
        if (!response.ok) {
            // Nếu có lỗi, lấy JSON và hiển thị message
            const errorData = yield response.json();
            console.error("Lỗi khi đăng ký:", errorData.message); // In ra thông điệp lỗi từ backend
            // throw new Error(errorData.message); // Ném lỗi để xử lý trong catch (nếu có)
        } else {
            // Nếu phản hồi thành công, lấy dữ liệu JSON
            data = yield response.json();
            console.log("Message nhận được:", data); // In ra token nhận được nếu thành công


            // THỰC HIỆN ĐĂNG NHẬP

            yield call(login, { payload: { userName, passwordHash, navigate } });
        }

    


    }catch(error){

        console.log(error);
    }
}



function* logout({ payload: { navigate } }) {
    try {
        // Xóa token trong cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Xóa cookie token
        localStorage.removeItem("authUser"); // Xóa thông tin người dùng trong localStorage

        // Dispatch action logout thành công
        yield put(logoutUserSuccess(true));
        
        // Điều hướng đến trang login
        navigate('/login');
    } catch (error) {
        console.error("Lỗi khi logout:", error);
    }
}


// src/sagas/authSaga.js






export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}
export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser)
    ]);
}