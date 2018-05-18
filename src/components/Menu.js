import React from 'react'
import PropTypes from 'prop-types'

export default class Menu extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            'is_opened': false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle()
    {
        this.setState({is_opened: !this.state.is_opened});
    }

    render()
    {
        const collapsedBlockStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: '1000',
            height: '100vh',
            display: this.state.is_opened?'block':'none',
            padding: '15px',
        };

        const overlayStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: '#000000',
            opacity: 0.3,
            height: "100vh",
            width: "100vw",
            display: this.state.is_opened?'block':'none',
        };

        return (
            <div className={'row ' + this.props.className} style={this.props.style}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-12">
                    {this.props.is_loading ? <div className='loader' /> : ''}
                    {/*<a className="navbar-brand" href="/"></a>*/}
                    <button style={{display: "inline-block", marginLeft: 'auto'}} className="navbar-toggler" type="button" onClick={this.toggle}>
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className='navbar-overlay' style={overlayStyle} onClick={this.toggle} />
                    <div className="bg-dark" style={collapsedBlockStyle}>
                        <button type="button" className="close text-white" aria-label="Close" onClick={this.toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br />
                        {this.props.children}
                    </div>
                </nav>
            </div>
        );
    }
}

Menu.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    is_loading: PropTypes.bool,
};

Menu.defaultProps = {
    className: '',
    style: {},
    is_loading: false,
};