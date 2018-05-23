import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {hideNotify} from "../actions/gameActions";
import {Animated} from 'react-animated-css'

class Notify extends React.Component
{
    show()
    {
        setTimeout(() => {
            this.props.dispatch(hideNotify());
        },this.props.duration);
    }

    render()
    {
        if(this.props.active)
        {
            this.show();
        }

        const out =
            <div className="container">
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.props.active} animateOnMount={false} >
                    <div className={`app-notify alert alert-${this.props.type ? this.props.type : 'warning'} text-center`} role="alert">{this.props.text}</div>
                </Animated>
            </div>;
        return ReactDOM.createPortal(out, document.getElementById('portal-overlay'));
    }
}

Notify.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    duration: PropTypes.number,
};

Notify.defaultProps = {
    type: "",
    text: "",
    duration: 3000,
};

export default connect((state) => {
    return {
        active: state.notify.active,
        type: state.notify.type,
        text: state.notify.text,
    }
})(Notify);