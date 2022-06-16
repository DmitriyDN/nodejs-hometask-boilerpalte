import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';

import './fight.css'
import FightModal from '../fightModal/index.js';
import FightsList from '../fightsList';
import { getFights } from '../../services/domainRequest/fightRequest';

class Fight extends React.Component {

    state = {
        fights:[],
        fighters: [],
        fighter1: null,
        fighter2: null,
        start:false,
        stats:false
    };

    async componentDidMount() {
        const fighters = await getFighters();
       
        if(fighters && !fighters.error) {
            this.setState({ fighters });
        }
       
    }

    onFightStart = () => {
        if(this.state.fighter1 && this.state.fighter2){
       
            this.setState({start:true})
        }
    }

    onCreate = (fighter) => {
        this.setState({ fighters: [...this.state.fighters, fighter] });
    }

    onFighter1Select = (fighter1) => {
        this.setState({fighter1 });
    }

    onFighter2Select = (fighter2) => {
        this.setState({ fighter2 });
    }

    getFighter1List = () => {
        const { fighter2, fighters } = this.state;
        if(!fighter2) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter2.id);
    }

    getFighter2List = () => {
        const { fighter1, fighters } = this.state;
        if(!fighter1) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter1.id);
    }

    getStats = () => {
        getFights().then(arr=>{
            const fights = arr.reverse()
            this.setState({fights});
           }).then(()=> this.setState({stats:true}))
        
    }

    render() {
        const  { fighter1, fighter2, } = this.state;
        return (
            <div id="wrapper">
                <NewFighter onCreated={this.onCreate} />
                <div id="figh-wrapper">
                    <Fighter selectedFighter={fighter1} onFighterSelect={this.onFighter1Select} fightersList={this.getFighter1List() || []} />
                    <div className="btn-wrapper">
                        <Button onClick={this.onFightStart} variant="contained" color="primary">Start Fight</Button>
                    </div>
                    <Fighter selectedFighter={fighter2} onFighterSelect={this.onFighter2Select} fightersList={this.getFighter2List() || []} />
                </div>
                <div className="btn-wrapper">
                    <Button  onClick={()=>this.getStats()} variant="contained" color="primary">Get Stats</Button>
                </div>
              {
                (this.state.stats)? <FightsList fightsList={this.state.fights}/>:null
              }
               {(this.state.start)?<FightModal firstFighter={fighter1} secondFighter={fighter2} onClose={()=>this.setState({start:false})}/>:null}
            </div>
        );
    }
}

export default Fight;