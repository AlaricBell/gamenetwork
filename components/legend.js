import React, {Component} from 'react';

export default class Legend extends Component {

    render() {
        return (   
            <div className="col-6 container-graph-legend">
                <img src={this.props.legends[0].metadata.tallImageUrl} alt="img" height={250}/>
            </div>
        )
    }
}