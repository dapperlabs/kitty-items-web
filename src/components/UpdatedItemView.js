import React from 'react';


export default function UpdatedItemView({itemId}, {isHighlighted}) {
    const [item, updateItem] = useKittyItem(itemId)

    return (
      <div className={item.highlighted ? "itemWindow is-highlighted" : "itemWindow" } onClick={this.onClick}>
        {item.highlighted ? <div className="hightlight-indicator"/> : ""}
        <div className="itemContainer">
          <img className="item" src={item.image}/>
        </div>    
      </div>  
    )
}
export default UpdatedItemView;