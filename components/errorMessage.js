import {Component} from 'react'

export default class ErrorMessage extends Component {
  state = {
    show: true
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: false})
    }, 10000)
  }
  render() {
    if(this.state.show) {
      return (
        <div className="col-12 my-2">
          <div className="message message-error">
            <p>{this.props.error}</p>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
  
}