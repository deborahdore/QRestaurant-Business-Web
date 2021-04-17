import {ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN} from "../../constants/Constants";
import {history} from '../../components/App';

const axios = require('axios').default;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    });


axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    /*
        if (error.response.data.code === 103 && !originalRequest._retry && error.response.status === 401) {

            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
            const request = {
                refreshToken: refreshToken
            }
            return axios.post(API_BASE_URL + '/login/refresh',
                JSON.stringify(request))
                .then(res => {
                    if (res.status >= 200 && res.status < 300 && res.data.code === 0) {
                        sessionStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
                        sessionStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);
                        return axios(originalRequest);
                    }
                })
        }

     */
    switch (error.response.data.code) {
        case 103:
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
                const request = {
                    refreshToken: refreshToken
                }
                return axios.post(API_BASE_URL + '/login/refresh',
                    JSON.stringify(request))
                    .then(res => {
                        if (res.status >= 200 && res.status < 300 && res.data.code === 0) {
                            sessionStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
                            sessionStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);
                            return axios(originalRequest);
                        }
                    });
            }
            break;
        case 3:
        case 101:
        case 102:
        case 104:
        case 105:
            history.replace("/");
            window.location.reload();
            break;
        case 500:
            alert("Qualcosa è andato storto con i nostri server. Riprova più tardi!");
            break;
        case 301:
            alert("Nome utente e/o password non corretti!");
            break;
        case 201:
            alert("Numero di telefono attualmente in uso! Scegline un altro.");
            break;
        case 601:
            alert("L'esportazione del file è fallita. Riprova.");
            break;
        default:
            console.warn("Server responded with " + error.response.status)
    }

    return Promise.reject(error);
});

const request = (options) => {

    const promise = axios({
        method: options.method,
        url: API_BASE_URL + options.url,
        data: options.body,
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        },
    });
    if (promise.then((response) => response.data) !== undefined)
        return promise.then((response) => response.data)
}
const downloadRequest = (options) => {
    return axios.get(API_BASE_URL + options.url, {
        responseType: "multipart/form-data",

        validateStatus: function (status) {
            return status >= 200 && status < 300;
        },

    })
        .then(response => {
            return response;
        })
        .catch(function (error) {
            console.warn("ERROR" + error);
            return error.response;
        })

}

export function login(loginRequest) {

    return request({
        url: "/login",
        method: "POST",
        body: loginRequest,
    });
}


export function registration(registrationRequest) {
    return request({
        url: "/registration",
        method: "POST",
        body: registrationRequest,
    });
}

export function getAttendanceInfected(idNotification) {
    return downloadRequest({
        url: "/attendance/infected/notification/" + idNotification,
        method: "GET",
    });
}

export function logout() {
    return request({
        url: "/logout",
        method: "POST",
        body: {}
    });
}

export function getSocieties() {
    return request({
        url: "/society",
        method: "GET"
    });
}

export function postRestaurant(postRestaurantRequest) {
    return request({
        url: "/society",
        method: "POST",
        body: postRestaurantRequest
    });
}

export function getNotifications(idSociety) {
    return request({
        url: "/notification/society/" + idSociety,
        method: "GET"
    });
}

export function getAttendancesForDate(idSociety, date) {
    return request({
        url: "/attendance/society/" + idSociety + "/date/" + date,
        method: "GET"
    });
}

export function getAttendance(idSociety) {
    return request({
        url: "/attendance/society/" + idSociety,
        method: "GET"
    });
}

export function isValid() {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
    if (accessToken === null || refreshToken === null)
        return false;
    if (!accessToken.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
        return false;
    }
    if (!refreshToken.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
        return false;
    }
    return request({
        url: "/login/refresh",
        method: "POST",
        body: {
            refreshToken: refreshToken
        }
    }).then(response => {
        return response.code === 106;
    }).catch(function (error) {
        return false;
    });
}


