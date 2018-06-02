import React from 'react'
import PropTypes from 'prop-types'
import Saves from "../containers/Saves";
import BugForm from "../containers/BugForm";

export default class Menu extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            is_opened: false,
            is_save_block_opened: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleSaveBlock = this.toggleSaveBlock.bind(this);
        this.toggleBugBlock = this.toggleBugBlock.bind(this);
    }

    toggle()
    {
        this.setState({is_opened: !this.state.is_opened});
    }

    closeAll()
    {
        this.setState({
            is_opened: false,
            is_save_block_opened: false,
            is_bug_block_opened: false,
        })
    }

    toggleSaveBlock()
    {
        this.setState({is_save_block_opened: !this.state.is_save_block_opened});
    }

    toggleBugBlock()
    {
        this.setState({is_bug_block_opened: !this.state.is_bug_block_opened});
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

        const collapsedSaveBlockStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: '1000',
            height: '100vh',
            display: this.state.is_save_block_opened?'block':'none',
            padding: '15px',
        };

        const collapsedBugBlockStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: '1000',
            height: '100vh',
            display: this.state.is_bug_block_opened?'block':'none',
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
            display: (this.state.is_opened || this.state.is_save_block_opened || this.state.is_bug_block_opened)?'block':'none',
        };

        return (
            <div className={'row ' + this.props.className} style={Object.assign({},this.props.style,{height: '56px'})}>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark col-12">
                    {this.props.is_loading ? <div className='loader' /> : ''}
                    {/*<a className="navbar-brand" href="/"></a>*/}
                    <div style={{display: "inline-block", marginLeft: 'auto'}}>
                        <button style={{display: "inline-block"}} className="navbar-toggler mr-2" type="button" onClick={this.toggleBugBlock}>
                            <span className="oi oi-bug" />
                        </button>
                        <button style={{display: "inline-block"}} className="navbar-toggler" type="button" onClick={this.toggleSaveBlock}>
                            <span className="oi oi-bookmark" />
                        </button>
                        <button style={{display: "inline-block"}} className="navbar-toggler" type="button" onClick={this.toggle}>
                            <span className="oi oi-person" />
                        </button>
                    </div>
                    <div className='navbar-overlay' style={overlayStyle} onClick={() => {this.closeAll()}} />
                    <div className="bg-dark" style={collapsedBlockStyle}>
                        <button type="button" className="close text-white" aria-label="Close" onClick={this.toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br />
                        {this.props.children}
                    </div>
                    <div className="bg-dark" style={collapsedSaveBlockStyle}>
                        <button type="button" className="close text-white" aria-label="Close" onClick={this.toggleSaveBlock}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br />
                        <div style={{padding: '10px', textAlign: 'center'}}>
                            <h3 className="text-light">Закладки</h3>
                            <hr className="bg-light" />
                            <Saves />
                        </div>
                    </div>
                    <div className="bg-dark" style={collapsedBugBlockStyle}>
                        <button type="button" className="close text-white" aria-label="Close" onClick={this.toggleBugBlock}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br />
                        <div style={{padding: '10px', textAlign: 'center'}}>
                            <h3 className="text-light">Сообщить об ошибке</h3>
                            <hr className="bg-light" />
                            <BugForm />
                        </div>
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