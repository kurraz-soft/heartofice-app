import React, { Component } from 'react';
import './App.css';
import Menu from "../components/Menu";
import AnswersContainer from "./AnswersContainer";
import { connect } from 'react-redux'
import {pageActionFetch} from "../actions/gameActions";
import {resolveScenario} from "../scenarios/scenarios";

class App extends Component
{
    componentDidMount()
    {
        if(this.props.page === 'start')
            this.props.dispatch(pageActionFetch(this.props.character, this.props.page, 0));
    }

    answerSelect(selected)
    {
        this.props.dispatch(pageActionFetch(this.props.character, this.props.page, selected));
    }

    render() {

        let Viewport;

        if(this.props.scenario)
        {
            Viewport = () => (
                <div className="col">{ resolveScenario(this.props.scenario) }</div>
            );
        }
        else
        {
            Viewport = () => (
                <div className="col" dangerouslySetInnerHTML={{__html: this.props.body}} />
            );
        }

        return (
          <div className='container-fluid' style={{height: 'inherit'}}>
              <div style={{height: 'inherit'}}>
                  <Menu style={{ marginBottom: '10px' }} is_loading={this.props.is_loading}>
                      <div style={{padding: '10px', textAlign: 'center'}}>
                          <h3 className="text-light">Персонаж</h3>
                          <p className="font-weight-light font-italic">{ this.props.character.class }</p>
                          <hr className="bg-light" />
                          <div style={{padding: '15px'}}>
                              <h5>Умения</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                              ))}
                              </ul>
                          </div>
                          <div style={{padding: '15px'}}>
                              <h5>Инвентарь</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {Object.keys(this.props.character.inventory).map((key, index) => (
                                  <li key={index}>{key}{this.props.character.inventory[key]>1?'(' + this.props.character.inventory[key] +')':''}</li>
                              ))}
                              </ul>
                          </div>
                      </div>
                  </Menu>
                  <div className={'row game-viewport' + (this.props.answers.length > 0 ? '' : ' game-viewport-full')}>
                      <Viewport/>
                  </div>
                  {this.props.answers.length > 0 ? <hr className='separator-h' /> : ''}
                  <div className='row'>
                      <div className='col'>
                          <AnswersContainer answers={this.props.answers} onSelect={this.answerSelect.bind(this)} />
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default connect((state) => {
    return {
        character: state.character,
        answers: state.answers,
        body: state.body,
        page: state.page,
        scenario: state.scenario,
    };
})(App);
