import React from 'react'
import PropTypes from 'prop-types'
import {resolveScenario} from "../scenarios/scenarios";

export default class Viewport extends React.PureComponent
{
    render()
    {
        if(this.props.scenario)
        {
            return <div className="col">{ resolveScenario(this.props.scenario) }</div>
        }else
        {
            return <div className="col" dangerouslySetInnerHTML={{__html: this.props.body}} />
        }
    }
}

Viewport.propTypes = {
    scenario: PropTypes.string,
    body: PropTypes.string,
};

Viewport.defaultProps = {
    scenario: "",
    body: "",
};