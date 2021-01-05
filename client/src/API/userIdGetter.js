function userIdGetter(){
    const userData = JSON.parse(localStorage.userData);

    return userData;
}

export default userIdGetter