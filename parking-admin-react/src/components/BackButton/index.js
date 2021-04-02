import React from 'react'

class BackButton extends React.Component {
    static contextTypes = {
        router: () => true, // replace with PropTypes.object if you use them
    }
    render() {
        return (
            <button type="button" onClick={this.context.router.history.goBack} className={"btn btn-default "+this.props.class}>{this.props.text}</button>
        )
    }
}

export default BackButton