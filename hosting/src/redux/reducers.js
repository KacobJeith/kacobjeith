import { combineReducers } from 'redux'
import Immutable from 'immutable'
import 'babel-polyfill'
import { initialState } from '../index'
import * as actions from './actions'
import * as async from './async'

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN' :

      import(/* webpackChunkName: "firebaseAuth" */ '../firebase/FirebaseAuth').then((auth) => auth.handleLogin());

      return state

    case 'POPULATE_COLLECTIONS' :

        let titleCollections = Immutable.Map(state.collections).toJS();

        for (let i = 0; i < action.collections.length; i++){
          titleCollections[action.collections[i].title] = action.collections[i];
        }

      return Immutable.Map(state).set('collections', titleCollections).toJS()

    case 'CREATE_CHECKOUT' :

      import(/* webpackChunkName: "firebaseDatabase" */ '../firebase/FirebaseDatabase').then((database) => database.saveCheckoutID(action.checkoutID));

      return Immutable.Map(state).set('checkoutID', action.checkoutID).toJS()

      return state


      return state

    case 'SAVE_CART_LOCALLY' :

        var trueLineItemIDs = [];
        for (var i = 0; i < action.cart.lineItems.length; i++) {
          trueLineItemIDs.push(action.cart.lineItems[i].variant.id);
        }

        var knownLineItemIDs = Object.keys(state.cartContext);

        var newCartContext = Immutable.Map(state.cartContext).toJS();

        for (var lineItemID in trueLineItemIDs) {
          var value = trueLineItemIDs[lineItemID];

          if (!(value in newCartContext)) {

            if (Object.keys(state.places).length > 0) {

              newCartContext[value] = Object.keys(state.places)[0];

            } else {
              newCartContext[value] = 'none';
            }
          }
        }

      return Immutable.Map(state).set('shoppingCart', action.cart).set('cartContext', newCartContext).toJS()

    case 'UPDATE_CART_CONTEXT' :

      var newCartContext = Immutable.Map(state.cartContext).toJS();

      newCartContext[action.variantID] = action.placeID;


      return Immutable.Map(state).set('cartContext', newCartContext).toJS()


    case 'SCROLL':

      return Immutable.Map(state).set('scrollPosition', action.positionY).toJS()

    case 'UPDATE_WEBGL_STATUS':

      return Immutable.Map(state).set('webGLStatus', action.status).toJS()

    case 'LOGOUT':

      import(/* webpackChunkName: "firebaseAuth" */ '../firebase/FirebaseAuth').then((auth) => auth.logout());

      return initialState

    case 'LOGIN_STATUS' :

      return Immutable.Map(state).set('loginStatus', action.status).toJS()

    case 'LOAD_PROVIDER' :

      var newState = Immutable.Map(state.providers).set(action.provider.providerId, action.provider).toJS();

      return Immutable.Map(state).set('providers', newState).toJS()

    case 'LOGIN_TO_FIREBASE' : 

      import(/* webpackChunkName: "firebaseAuth" */ '../firebase/FirebaseAuth').then((auth) => auth.firebaseAuthUI());

      return state

    case 'LOGOUT_OF_FIREBASE' :

      import(/* webpackChunkName: "firebaseAuth" */ '../firebase/FirebaseAuth').then((auth) => auth.logout());

      return state

    case 'ADD_USER': 

      return Immutable.Map(state).set('user', action.user).toJS();

    case 'UNLINK_PROVIDER' :

      var newState = Immutable.Map(state.providers).delete(action.providerId).toJS();

      return Immutable.Map(state).set('providers', newState).toJS()

    case 'ADD_DEVICE' :

      var newState = Immutable.Map(state.devices).set(action.deviceID, action.device).toJS();

      return Immutable.Map(state).set('devices', newState).toJS()

    case 'ADD_PLACE' :

      var newState = Immutable.Map(state.places).set(action.placeID, action.place).toJS();

      return Immutable.Map(state).set('places', newState).toJS()

    case 'ADD_GROUP' :

      var newState = Immutable.Map(state.groups).set(action.groupID, action.group).toJS();

      return Immutable.Map(state).set('groups', newState).toJS()

    case 'SAVE_NEW_PLACE' :

      import(/* webpackChunkName: "firebaseDatabase" */ '../firebase/FirebaseDatabase').then((database) => database.saveNewPlace(action.placeName, action.placeSSID, action.placeSSIDPassword));

      return state

    case 'DELETE_PLACE_FROM_FIREBASE' :

      import(/* webpackChunkName: "firebaseDatabase" */ '../firebase/FirebaseDatabase').then((database) => database.deletePlace(action.placeID));

      return state

    case 'DELETE_PLACE':

      var newState = Immutable.Map(state.places).delete(action.placeID).toJS();

      return Immutable.Map(state).set('places', newState).toJS()

    case 'SET_SVG_TEXT':
      return Immutable.Map(state).set('svgText', action.svgText).toJS();

    case 'SUBMIT_CONTACT_FORM':

      async.submitContactForm(action.name, action.company, action.email, action.message);

      return state;


    default:
      return state
  }
}
