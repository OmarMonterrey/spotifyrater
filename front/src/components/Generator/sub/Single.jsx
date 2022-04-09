import { useTranslation } from "react-i18next";
function Single(props){
    const { t } = useTranslation();
    return <div className="single" onClick={() => props.handleClick(props)}>
        <div className="single-media">
            <img src={props.image} alt={props.name} />
        </div>
        <div className="single-meta">
            <p className="title">{props.name}</p>
            { props.type === 'album' && <p className="type">{t('type.album')}</p> }
            { props.type === 'track' &&
                <p className="type">
                {
                    props.album && t('type.track_from').replace('{0}', props.album)
                }
                {
                    !props.album && t('type.track')
                }
                </p>
            }
            <p className="artist">{props.artist}</p>
        </div>
    </div>
}
export default Single;