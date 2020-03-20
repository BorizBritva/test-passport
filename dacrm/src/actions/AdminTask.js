export default function submitTask( data) {
    return (dispatch, getState) => {

        fetch(`/admin/get-tasks/${data.url}`, {
            method: "POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
              }),
            mode: 'same-origin',
            body: JSON.stringify({user: data.id, task: data.task})
          })
            .then( response => {
                if (response.ok) {
                    response.json()
                        .then( tasks => {
                            console.log(tasks)
                            dispatch({
                                type: "GET_ACCOUNT_TASKS",
                                payload: tasks
                            });
                        })
                }
            })
    }

}
