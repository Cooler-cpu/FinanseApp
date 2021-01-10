function userDataGetter(){
    const userData = JSON.parse(localStorage.userData);

    return userData;
}

export default userDataGetter