import React, {Fragment} from 'react';
import EditorHeader from './headnav';
import './editor.sass';

export default class Editor extends React.Component {
    render() {
        return(
          <>
            <EditorHeader/>
            <div>
                EditorPage
            </div>
          </>
        )
    }
}
