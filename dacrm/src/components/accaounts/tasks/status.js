import React from 'react';
import createWorksList from '../../../helpers/createWorksList';

export default class StatusList extends React.Component {

  showWorksList() {
    if (this.props.works)
    return this.props.works.map( ( item, key ) => {
      return (
        <li className={`list__string${item.replacements ? ' repl' : ''} list-group-item`} key={key}>
          {createWorksList(item.custom_fields, ['Заказчик', 'Тип крефтивов', 'Количество крео', 'Ссылка на креотивы', 'Замены', 'ТЗ', 'Editor'])}
          <div className="list__button btn btn-primary">В работе</div>
        </li>
      )
    })
  }

  render() {
    return (
      <>
        <ul className="status__list list-group col-md-2 col-lg-2">
          <span className="list__name list-group-item list-group-item-dark">В работе</span>
          {this.showWorksList()}
        </ul>
      </>
    )
  }
}
