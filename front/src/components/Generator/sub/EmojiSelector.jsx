import emoji from 'node-emoji';
import priorityEmojis from '../../../config/priorityEmojis';
import excludeEmojis from '../../../config/excludeEmojis';

function EmojiSelector(props){
    return <div className="emoji-selector">
        {priorityEmojis.map((name,i) => 
            <SingleEmoji key={i} setEmoji={props.setEmoji} name={name}/>
        )}
        {[...emoji.search('') ].map((val,i) => {
            if( priorityEmojis.includes(val.key) ) return false;
            if( excludeEmojis.includes(val.key) ) return false;
            if( val.key.substring(0, 5) === 'flag-' ) return false;
            
            return <SingleEmoji key={i} setEmoji={props.setEmoji} name={val.key}/>
        })}
    </div>
}
function SingleEmoji(props){
    return <div className="emoji-selector_single" onClick={() => props.setEmoji(props.name)}>
        { emoji.get(props.name) }
    </div>
}
export default EmojiSelector;