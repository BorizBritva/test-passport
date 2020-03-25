const pushButton = (task) => {
  if (task.editor_da.length) {
    return
      <input className="list__button btn btn-primary" type="button" value="Переназначить" onClick={() => { this.props.submit( {task: {...item, comment_task: this.props.commentToTask, editor: this.props.editor}, id: localStorage.getItem('user').slice(1, -1), url: 'status', token: localStorage.getItem('token') } ) } }/>
  } else {
      <input className="list__button btn btn-primary" type="button" value="Назначить" onClick={() => { this.props.submit( {task: {...item, comment_task: this.props.commentToTask, editor: this.props.editor}, id: localStorage.getItem('user').slice(1, -1), url: 'status', token: localStorage.getItem('token') } ) } }/>
  }
}

export default pushButton;
