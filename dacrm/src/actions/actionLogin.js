const submitLogin = (e, loginData) => {
    return (dispatch, getState) => {
        e.preventDefault();
        //const { login, password } = loginData;

        fetch('/crm/login', {
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
                      if (data.error) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        dispatch({
                          type: 'ERROR',
                          payload: data.error
                        })
                      } else {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        localStorage.setItem('edit', data.edit);
                        if (data.edit == 0) {
                            window.location.assign(`${window.location.origin}/dacrm/accounts/acc=${data.username}`)
                        } else {
                            window.location.assign(`${window.location.origin}/dacrm/user/edit=${data.username}`)
                        }
                      }
                  })
              }
          })
    }
}

const registration = (e, regData) => {
  return (dispatch, getState) => {
    e.preventDefault();

    fetch('/editor/addeditor', {
      method: "POST",
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      mode: 'same-origin',
      body: JSON.stringify(regData)
      })
      .then( response => {
          if (response.ok) {
            response.json()
              .then( data => {
                  console.log(data)
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

const inputName = (name) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'INPUT_NAME',
            payload: name
        })
    }
}

const inputPhone = (phone) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'INPUT_PHONE',
            payload: phone
        })
    }
}

export {registration, submitLogin, inputLogin, inputPassword, inputName, inputPhone};
