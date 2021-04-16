import {Component} from 'react'

export default class BtnGraph extends Component {
    renderFilterOptions = (data, option, index, getGraphData) => {
        return (
            <button className="button-graph" key={index} onClick={() => getGraphData(data, option.value)}>{option.display}</button>
        )
    }

    render() {
        return (
            <div className="container-graph-buttons">
                {this.props.options.map((option, index) => (
                this.renderFilterOptions(this.props.data, option, index, this.props.getGraphData)))}
            </div>
        )
    }
}