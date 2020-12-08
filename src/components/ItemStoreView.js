import React from 'react';
import './ItemStoreView.css'
import ItemView from './ItemView';
import KittyView from './KittyView';

class ItemStoreView extends React.Component {
    constructor() {
      super();
    }

    componentDidMount() {
    }

    render() {
      return (
        <div className="itemStoreWindow">
          <div className="kittyWindow">
            <KittyView/>
          </div>
          <div className="kittyWindowRight">
            <div className="kittyWindowHeader">
              <div className="kittyItemsTitle">Items Store</div>
                <div className="buttonHolder">
                  <div>Cancel</div>
                  <button>Apply</button>
                </div>
              </div>
              <div>
                <ItemView/>
                <ItemView/>
                <ItemView/>
              </div>
              <div>
                <ItemView/>
                <ItemView/>
                <ItemView/>
              </div>
            </div>
          </div>    
     );
    }
}
export default ItemStoreView;