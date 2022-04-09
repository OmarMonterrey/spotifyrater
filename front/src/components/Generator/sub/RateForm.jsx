import React from 'react';
import emoji from 'node-emoji';
import { withTranslation, useTranslation } from 'react-i18next';



import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EmojiSelector from './EmojiSelector';
import priorityEmojis from '../../../config/priorityEmojis';

const RSwal = withReactContent(Swal)

class RateForm extends React.Component{
    constructor(props){
        super(props);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.setEmoji = this.setEmoji.bind(this);
        this.changeEmoji = this.changeEmoji.bind(this);
        this.state = {
            valoration: []
        };
    }
    componentDidMount(){
        this.setState({
            'valoration': [
                {
                    'value': 3,
                    'label': this.props.t('label.lyrics'),
                    'emoji': 'pencil'
                },
                {
                    'value': 3,
                    'label': this.props.t('label.production'),
                    'emoji': 'musical_note'
                },
                {
                    'value': 3,
                    'label': this.props.t('label.innovation'),
                    'emoji': 'exploding_head'
                },
            ]
        });
    }
    render(){
        let overall = this.state.valoration.length ? this.state.valoration.reduce((prev,single) => prev+single.value, 0) / this.state.valoration.length : 0;
        overall = Math.round( overall * 2 ) / 2;
        let stars = [];
        for(let i = 1;i<=5;i++){
            stars.push( <div key={i} className={'emoji '+( overall >= i ? 'active' : '' )}>{emoji.get('star')}</div> );
        }
        return <div id="generator-inner-rate-form">
            <div className="valoration valoration-overall">
                <div className="label">{this.props.t('criteria.valoration')}</div>
                <div className="number">{overall}</div>
                <div className="emoji-list">{stars}</div>
            </div>
            { this.state.valoration.map((data,i) => 
                this.props.isEditing ?
                <ValorationEdit {...data} key={i} setLabel={(value) => this.setLabel(i, value)} changeEmoji={() => this.changeEmoji(i)} onRemove={() => this.remove(i)}/>
                    :
                <ValorationInput {...data} key={i} clickHandler={(value) => this.setValue(i, value)}/>
            )}
            {
                this.props.isEditing &&
                <button className="add-valoration" onClick={this.add}>{this.props.t('criteria.add')}</button>
            }
        </div>
    }
    setValue(key, value){
        if( ![1,2,3,4,5].includes(value) || !this.state.valoration[key] ) return;
        let newValoration = [...this.state.valoration];
        newValoration[key].value = value;
        this.setState({ valoration: newValoration });
    }
    setEmoji(key, value){
        Swal.close();
        if( !emoji.get(value) || !this.state.valoration[key] ) return;
        let newValoration = [...this.state.valoration];
        newValoration[key].emoji = value;
        this.setState({ valoration: newValoration });
    }
    setLabel(key, value){
        if( !this.state.valoration[key] ) return;
        value = value.replaceAll(/[^a-záéíóú0-9_\- .,]/ig, '');
        let newValoration = [...this.state.valoration];
        newValoration[key].label = value;
        this.setState({ valoration: newValoration });
    }
    changeEmoji(key){
        if( !this.state.valoration[key] ) return;
        let params = {
			title: this.props.t('emoji.select'),
            html: <EmojiSelector setEmoji={(value) => this.setEmoji(key, value) }/>,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: this.props.t('cancel'),
        }
		RSwal.fire( params );
    }
    remove(key){
        if( !this.state.valoration[key] ) return;
        let newValoration = [...this.state.valoration];
        delete newValoration[key];
        let newValorationDeleted = [...newValoration].filter(x => typeof x === 'object');
        this.setState({ valoration: newValorationDeleted });
    }
    add(){
        let newValoration = [...this.state.valoration];
        newValoration.push({
            label: this.props.t('criteria.new'),
            emoji: priorityEmojis[0],
            value: 3
        });
        this.setState({ valoration: newValoration });
    }
}

function ValorationInput( props ){
    let emojis = [];
    for(let i = 0;i<5;i++){
        emojis.push(
            <div key={i} className={'emoji '+( i < props.value ? 'active' : '' )} onClick={() => props.clickHandler((i+1))}>{emoji.get(props.emoji)}</div>
        );
    }
    return <div className="valoration valoration-input">
        <div className="label">{props.label}</div>
        <div className="number">{props.value}</div>
        <div className="emoji-list">{emojis}</div>
    </div>
}
function ValorationEdit( props ){
    const {t} = useTranslation()
    return <div className="valoration valoration-edit">
        <div className="label">
            <input type="text" onChange={(e) => props.setLabel(e.target.value)} value={props.label} />
        </div>
        <div className="emoji-button">
            <button className="change-emoji" onClick={props.changeEmoji}>{t('change')} {emoji.get(props.emoji)}</button>
        </div>
        <div className="emoji-button">
            <button className="remove-valoration" onClick={props.onRemove}>&times;</button>
        </div>
    </div>
}
export default withTranslation()(RateForm);