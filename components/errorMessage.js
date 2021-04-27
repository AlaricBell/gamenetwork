import {Component} from 'react'

export default class ErrorMessage extends Component {
  state = {
    show: true
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: false})
    }, 10000);

    const message = document.getElementById("message-error");
    setTimeout(() => {
      message.classList.add("message-fade")
    }, 1000);
  }
  render() {
    if(this.state.show) {
      return (
        <div className="col-12 mt-4">
          <div className="message message-error" id="message-error">
            <p>{this.props.error}</p>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
  
}