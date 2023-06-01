import React from "react";
const TagsInput = ({ tags, removeTag, handleKeyDown }) => {
    return (
        <div className="tags-input-container">
            {
                tags.map((tag, index) => (
                    <div className="tag-item">
                        <span className="text" >{tag}</span>
                        <span onClick={() => { removeTag(index) }} className="close">&times;</span>
                    </div>
                ))
            }
            <input onKeyDown={e => handleKeyDown(e)} type="text" className="tag-input" placeholder="add a skill" />
        </div>
    )
}

export default TagsInput;