import exit from '../helpers/exit';

export default function submitTask( data) {

    if (!data.token) {
        exit();
    }

    return (dispatch, getState) => {

        fetch(`/editor/get-tasks/${data.url}`, {
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
                            if (tasks.error) exit();
                            //console.log(tasks);
                            dispatch({
                                type: "GET_USER_TASKS",
                                payload: tasks
                            });
                        })
                }
            })
    }

}
