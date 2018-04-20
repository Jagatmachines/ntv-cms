import * as React from 'react';
import Preeti from 'preeti';
import { base, db } from '../../firebase/firebase';

class Headlines extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputConv: '',
            message: '',
            headList: null
        }
    }

    componentDidMount() {
        base.get('headlines', {
            context: this,
          }).then(data => {
            this.setState({
                headList: data
            })
          }).catch(err => {
            this.setState({
                message: err.message
            })
          })

        /* base.listenToCollection('myCollection', {
            context: this,
            then(data) {
                // do something with the data
                this.setState({
                    headList: data
                })
            },
            onFailure(err) {
                //handle error
                this.setState({
                    message: err.message
                })
            }
        }); */
    }

    handleChange = (e) => {
        this.setState({
            inputConv: Preeti(e.target.value)
        })
    }

    handleSave = () => {
        const headLineData = {
            doc : this.state.inputConv
        };

        let headLineRef = db.collection('headlines').doc();
        
        base.addToCollection('headlines', headLineData, headLineRef.id)
        .then(() => {
        //document is added to the collection
            this.setState({
                message: 'Headline saved'
            })
        }).catch((err) => {
        //handle error
            this.setState({
                message: err.message
            })
        });
    }

    render() {
        const { message, headList } = this.state;

        return(
            <div>
                {message.length ? message : ''}
                <h4>Headlines</h4>
                <textarea name="headline" id="headline" cols="100" rows="1" onChange={this.handleChange} value={this.state.inputConv}/>
                <button type="button" onClick={this.handleSave}>Save</button>
                <br/>
                <br/>
                <div>
                    {headList && headList.length ? headList.map((headDetail) => {
                        return(
                            <p key={headDetail.doc}>{headDetail.doc}</p>
                        );
                    }) : ''}
                </div>
            </div>
        );
    }
}

export default Headlines;