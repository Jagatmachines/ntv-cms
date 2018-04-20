import React from 'react';
import { base } from '../../firebase/firebase';

class AdGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageCollection: null,
            message: ''
        }
    }

    componentDidMount() {
        base.get('adbanner', {
            context: this,
            /* query: (ref) => {
                ref.where('type', '==', 'subscriber')
            } */
        }).then((data) => {
            this.setState({
                imageCollection: data
            })
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        })
    }

    render() {
        const { imageCollection } = this.state;

        return(
            <div>
                {imageCollection && imageCollection.length ?
                    imageCollection.map((image) => {
                        return (
                            <div key={image.imageName}>
                                <div>{image.imageName}</div>
                                <img src={image.url} alt={image.imageName}/>
                            </div>
                        );
                    }) : ''
                }
            </div>
        )
    }
}

export default AdGallery;