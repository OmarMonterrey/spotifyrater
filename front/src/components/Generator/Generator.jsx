import React from 'react';
import Search from './sub/Search';
import RateHeader from './sub/RateHeader';
import RateForm from './sub/RateForm';
import RateOptions from './sub/RateOptions';
import { withTranslation } from 'react-i18next';

import app from '../../config/firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';
const analytics = getAnalytics(app);

class Generator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'selectedItem': false,
            isEditingValorations: false
        }
        this.setResult = this.setResult.bind(this);
        this.generatorRef = React.createRef();
    }
    render(){
        let body = [];
        body.push( <Search key='search' setResult={this.setResult} hidden={ !!this.state.selectedItem }/> );
        if( this.state.selectedItem !== false ){
            body.push(
                <div id="generator-inner-rate-container" ref={this.generatorRef} key='generator'>
                    <RateHeader
                        item={this.state.selectedItem}
                        back={ () => this.setState({ selectedItem: false }) }
                    />
                    <RateForm
                        valoration={this.state.valoration}
                        isEditing={this.state.isEditingValorations}
                    />
                    <RateOptions
                        isEditingValorations={this.state.isEditingValorations}
                        generatorRef={this.generatorRef}
                        editValorations={ () => this.setState( {isEditingValorations: !this.state.isEditingValorations} ) }
                    />
                </div>
            );
        }
        return (
            <div id="generator">
                <div className="generator-inner">
                    <h1>Spotify Rater</h1>
                    { body }
                </div>
            </div>
        );
    }
    setResult(selectedItem){
        logEvent(analytics, 'select_result');
        this.setState({
            selectedItem
        });
    }
}
export default withTranslation()(Generator);