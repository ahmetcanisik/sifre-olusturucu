interface Params {
    id: string,
    text: string,
    checked: boolean,
    onClick: any
}

function CharacterChoice({ id, text, checked, onClick }: Params) {
    return (
        <div className="choice-character-area">
            <label htmlFor={id}>
                <input id={id} type="checkbox" title={text} value={text} defaultChecked={checked} onClick={onClick} />
                {text}
            </label>
            <div></div>
        </div>
    );
}

export default CharacterChoice;