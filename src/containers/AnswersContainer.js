import React from 'react'
import PropTypes from 'prop-types'

export default class AnswersContainer extends React.Component
{
    constructor()
    {
        super();

        this.select = this.select.bind(this);
    }

    select(event)
    {
        event.preventDefault();
        this.props.onSelect(event.target.dataset.value);
    }

    render()
    {
        return (
            <div>
                <ol>
                    {this.props.answers.map((item, index) => (
                        <li className='mb-3' key={index}><a onClick={this.select} href="" data-value={index}>{item}</a></li>
                    ))}
                </ol>
            </div>
        );
    }
}

AnswersContainer.propTypes = {
    onSelect: PropTypes.func,
    answers: PropTypes.array,
};

AnswersContainer.defaultProps = {
    onSelect: (selected) => {},
    answers: [],
};