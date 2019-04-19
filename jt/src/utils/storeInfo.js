




export const USER_INFO_SAVE = (value)=>{
    localStorage.setItem('USERINFO', JSON.stringify(value));
}

export const USER_INFO_GET = ()=>{
    return JSON.parse(localStorage.getItem('USERINFO'));
}


