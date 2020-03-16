const submitLogin = (e, loginData) => {
    return (dispatch, getState) => {
        e.preventDefault();
        //const { login, password } = loginData;

        fetch('/editor/auth', {
          method: "POST",
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }),
          mode: 'same-origin',
          body: JSON.stringify(loginData)
          })
          .then( response => {
              if (response.ok) {
                response.json()
                  .then( data => {
                      localStorage.setItem('token', data.token);
                      localStorage.setItem('user', JSON.stringify(data.editor));
                  })
              }
          })
    }
}

const inputLogin = (login) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'INPUT_LOGIN',
            payload: login
        })
    }
}

const inputPassword = (password) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'INPUT_PASSWORD',
            payload: password
        })
    }
}

export {submitLogin, inputLogin, inputPassword};
