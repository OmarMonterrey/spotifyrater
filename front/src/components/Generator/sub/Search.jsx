import React from 'react';
import Single from './Single';
import { withTranslation } from 'react-i18next';

import app from '../../../config/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAnalytics, logEvent } from 'firebase/analytics';

const functions = getFunctions(app);
const firebaseSearch = httpsCallable(functions, 'search');

const analytics = getAnalytics( app );

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'query': '',
            'results': [],
            'notice': false
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }
    render(){
        return (
            <div id="generator-inner-search" className={this.props.hidden ? 'hidden' : ''}>
                <div className="form">
                    <input type="text" className="form-input" placeholder={this.props.t('searchPlaceholder')} onChange={this.handleChange} value={this.state.query}/>
                </div>
                <div className="results">
                    { this.state.results.length === 0 &&
                        <p className="notice">{ this.state.notice || this.props.t('notice.start_writting') }</p>
                    }
                    {
                        this.state.results.map( (data,key) => {
                            return <Single key={key} {...data} handleClick={this.props.setResult}/>
                        })
                    }
                </div>
            </div>
        );
    }
    handleChange(e){
        if( this.state.timeout )
            window.clearTimeout( this.state.timeout )
        let value = e.target.value.replaceAll(/[^a-z0-9 \-_,.]/ig, '');
        this.setState({
            query: value,
            results: [],
            notice: value.length >= 3 ? this.props.t('notice.searching') : ( value.length === 0 ? this.props.t('notice.start_writting') : this.props.t('notice.three_chars') ),
            timeout: setTimeout(this.search, 750)
        });
    }
    async search(){
        if( this.state.query.length < 3 ) return;
        let res = await firebaseSearch({query: this.state.query});
        let results = this.sortResults( this.state.query, res.data );
        let notice = this.state.notice;
        logEvent(analytics, 'search');
        if( !results.length )
            notice = this.props.t('notice.no_results');
        this.setState( { results, notice } );
    }
    sortResults(query, data){
        query = query.toLowerCase();
        if( typeof data.sort !== 'function' ) return data;
        data.sort((a, b) => {
            let aM = ( a.name?.toLowerCase() === query || a.album?.toLowerCase() === query ) ? 1 : 0;
            let bM = ( b.name?.toLowerCase() === query || b.album?.toLowerCase() === query ) ? 1 : 0;
            if( aM === bM ) return 0;
            return aM > bM ? -1 : 1;
        })
        return data;
    }
}
export default withTranslation()(Search);