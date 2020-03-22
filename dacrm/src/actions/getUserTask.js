export default function getTasks(data) {
    return (dispatch, getState) => {

        fetch(`/editor/get-tasks`, {
          method: "POST",
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          }),
          mode: 'same-origin',
          body: JSON.stringify({id: data.id.toString()})
          })
            .then( response => {
                if (response.ok) {
                    response.json()
                        .then( tasks => {
                            console.log(tasks);
                            dispatch({
                                type: "GET_USER_TASKS",
                                payload: tasks
                            });
                        })
                }
            })

    }

}
