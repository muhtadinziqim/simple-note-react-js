import firebase, { database } from '../../firebase';

export const actionUsername = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "Maulana" })
    }, 1000)
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                console.log("success : ", res);
                dispatch({ type: "CHANGE_LOADING", value: false })
                resolve(true);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch({ type: "CHANGE_LOADING", value: false })
                reject(false);
            })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                const userData = {
                    email: res.user.email,
                    uid: res.user.uid,
                    verifiedEmail: res.user.verifiedEmail
                }
                console.log("success : ", res);
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_LOGIN", value: true })
                dispatch({ type: "CHANGE_USER", value: userData })
                resolve(userData);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_LOGIN", value: false })
                reject(false);
            })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        note: data.note,
        date: data.date
    })
}

export const getDataFromAPI = (data) => (dispatch) => {
    var urlNotes = firebase.database().ref('notes/' + data.userId);
    return new Promise((resolve, reject) => {
        urlNotes.on('value', function (snapshot) {
            // updateStarCount(postElement, snapshot.val());
            console.log("Data Get API : ", snapshot.val());
            const data = []
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: "SET_NOTES", value: data })
            resolve(snapshot.val());
        });
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    var urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.set(
            {
                title: data.title,
                note: data.note,
                date: data.date
            }, (err) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            })
    })
}

export const deleteDataAPI = (data) => (dispatch) => {
    var urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.remove()
    })
}