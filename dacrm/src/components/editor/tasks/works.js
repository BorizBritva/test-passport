import React from 'react';
import createWorksList from '../../../helpers/createWorksList';

export default class WorksList extends React.Component {

  showWorksList() {
      if (this.props.works)
    return this.props.works.map( ( item, key ) => {
      return (
        <li className={`list__string${item.replacements ? ' repl' : ''} list-group-item`} key={key}>
          {createWorksList(item.custom_fields, ['Заказчик', 'Количество крео', 'ГЕО', 'Аккаунт'])}
          <div className="inworks-content">
              <span className="content__name">ТЗ на разработку:</span>
              <span className="content__value">{item.comment_task}</span>
          </div>
          <div className="list-butn-wrap">
              <input className="list__button btn btn-primary" type="button" value="Взять в работу" onClick={() => { this.props.submit({id: localStorage.getItem('user').slice(1, -1), token: localStorage.getItem('token'), task: item, url: 'takework'}) }}/>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
        <ul className="works__list list-group col-md-2 col-lg-2">
          <span className="list__name list-group-item list-group-item-dark">Задачи</span>
          {this.showWorksList()}
        </ul>
    )
  }
}
