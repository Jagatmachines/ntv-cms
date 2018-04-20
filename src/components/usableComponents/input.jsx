import * as React from 'react';
import { withFormsy } from 'formsy-react';

class MyInput extends React.Component {
    /* constructor(props) {
        super(props);
    } */

    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        const errorMessage = this.props.getErrorMessage();
        const value = this.props.getValue();

        return (
            <div>
                <input 
                    type={this.props.type} 
                    onChange={this.changeValue} 
                    value={value || ''}
                />
                <span>{errorMessage}</span>
            </div>
        );
    }
}

export default withFormsy(MyInput);