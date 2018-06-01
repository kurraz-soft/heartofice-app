import React from 'react'

export default class Saves extends React.Component
{
    constructor()
    {
        super();

        let saves = [];
        if(localStorage.saves)
        {
            saves = JSON.parse(localStorage.saves);
        }

        this.state = {
            records: saves,
        };

    }

    saveRecord(index)
    {
        let recs = this.state.records;

        const date = new Date();

        recs[index] = {
            name: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            data: localStorage.reduxState,
        };

        this.setState({
            records: recs,
        })
    }

    loadRecord(index)
    {
        localStorage.reduxState = this.state.records[index].data;
        window.location.reload();
    }

    newRecord()
    {
        this.saveRecord(this.state.records.length);
    }

    delRecord(index)
    {
        let recs = this.state.records;

        recs.splice(index, 1);

        this.setState({
            records: recs,
        });
    }

    componentDidUpdate()
    {
        localStorage.saves = JSON.stringify(this.state.records);
    }

    render()
    {
        return (
            <div>
                <ul className='list-unstyled'>
                    {this.state.records.map((item, index) => (
                        <li key={index} className='border rounded p-1 mb-2'>
                            <div>{item.name}</div>
                            <div>
                                <button className="btn btn-secondary" onClick={() => this.loadRecord(index)}>Загрузить</button>
                                <button className="btn btn-secondary" onClick={() => this.saveRecord(index)}>Перезаписать</button>
                                <button className="btn btn-secondary" onClick={() => this.delRecord(index)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={'text-center'}>
                    <button onClick={() => this.newRecord()} className='btn btn-secondary'>Новая закладка</button>
                </div>
            </div>
        );
    }
}