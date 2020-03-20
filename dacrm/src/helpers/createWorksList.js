import React, { Fragment } from 'react';

const createWorksList = (arrayWorks, filtArr) => {

    let works = [];

    if (filtArr) {

        filtArr.forEach((item, i) => {
            let filtProp = item;
            arrayWorks.forEach( task => {
                if (task.name.toLowerCase() == filtProp.toLowerCase()) {
                    works.push(task);
                } }
            );
        });

    }

    return works.map( (item, key) => {
        if (item.name.toLowerCase() == 'Ссылка на креотивы'.toLowerCase()) {
          return (
              <div key={key} className="inworks-content">
                  <span className="content__name">{item.name}:</span>
                  <a href={item.values[0].value} className="content__value linkToCreo">{item.values[0].value}</a>
              </div>
          )
        }
        return (
            <div key={key} className="inworks-content">
                <span className="content__name">{item.name}:</span>
                <span className="content__value">{item.values[0].value}</span>
            </div>
        )
    })
}

export default createWorksList;
