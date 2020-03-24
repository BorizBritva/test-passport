import React, { Fragment} from 'react';
import selectedUser from '../../../helpers/selectedUser';
import createWorksList from '../../../helpers/createWorksList';

export default class ConsList extends React.Component {

  showConsList() {
    if (this.props.cons)
    return this.props.cons.map( ( item, key ) => {
      return (
        <li className={`list__string${item.replacements ? ' repl' : ''} list-group-item`} key={key}>
        <div className="inworks-content">
            <span className="content__name">ID:</span>
            <span className="content__value">{item.id}</span>
        </div>
            {createWorksList(item.custom_fields, ['Заказчик', 'Тип крефтивов', 'Количество крео', 'Ссылка на креотивы', 'Замены', 'ТЗ'])}
            <form className="consForm">
            <div className="consForm__comment">ТЗ на разработку:</div>
                <div className="consForm__data form-group">
                    <label className="consForm__field">
                        <textarea rows="5" className="com-field form-control" onChange={(e) => {item.comment_task = e.target.value}} name="text"></textarea>
                    </label>
                    <div className="consForm__users form-group">
                        <select className="consUsers__list form-control form-control-sm" onChange={(e) => { selectedUser(e, item) } }>
                            <option>--Выбрать исполнителя</option>
                            {this.props.users.map( (item, key ) => {
                                return (
                                    <option data-user={item._id} key={key}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="consForm__button worksButtonWrap">
                        <input className="list__button btn btn-primary" type="button" value="Назначить" onClick={() => { this.props.submit( {task: item, id: localStorage.getItem('user').slice(1, -1), url: 'status', token: localStorage.getItem('token') } ) } }/>
                        <input className="list__button btn btn-primary" type="button" value="Отменить" onClick={() => { this.props.submit( {task: item, id: localStorage.getItem('user').slice(1, -1), url: 'toback', token: localStorage.getItem('token') } ) } }/>
                    </div>
                </div>
             </form>
        </li>
      )
    })
  }

  render() {
    return (
      <>
        <ul className="works__list list-group col-md-2 col-lg-2">
          <span className="list__name list-group-item list-group-item-dark">Править ТЗ</span>
          {this.showConsList()}
        </ul>
      </>
    )
  }
}
