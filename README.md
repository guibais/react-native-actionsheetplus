

# React Native ActionSheet Plus!

"Forked" from [React-Native-Map-Link](https://github.com/leanmotherfuckers/react-native-map-link)

Trying to make the map link, for generic pruposes, not just maps!


![enter image description here](https://i.imgflip.com/2ut7ai.gif)


## Installation

### 1. Install the package

- First Install react modal
```shell
npm i -S react-native-modal         	# or yarn add react-native-modal
npm i -S react-native-actionsheetplus   # or yarn add react-native-actionsheetplus
```

## Usage

```js
import ActionSheetPlus from  "react-native-actionsheetplus";

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isVisible: false  //Set a state to toggle visibility
    };
  }
  render() {
    return (
      <View style={styles.container}> // It doesn't need to have a view, or anything
        <Button
          title="Open ActionSheetPlus"
          onPress={() => this.setState({ isVisible: true })} //something needs to set the state
        />
        <ActionSheetPlus
          isVisible={this.state.isVisible} // show the ActionSheet
          onCancelPressed={() => this.setState({ isVisible: false })} // Cancel Button Pressed
          onAppPressed={() => this.setState({ isVisible: false })} // On Any Item Pressed
          onBackButtonPressed={() => this.setState({ isVisible: false })} // On BackButton Pressed
          modalProps={{
            animationIn: "slideInUp" // Animation, see the react-native map link
          }}
          itemsTitle={["Call Phone", "Open Whatsapp Chat", "Share"]} // The items title
          itemsImage={[image, image, image]} // The items images
          itemsPress={index => { // What to do on press
            alert(index); // your need to use the index, starting from 0
          }}
          options={{
            dialogTitle: "Choose one", // Title of the dialog
            dialogMessage: "Which one do you want to use?", // The Message
            cancelText: "Cancel" // Cancel string
          }}
        />
      </View>
    );
  }
```

The Popup component uses react-native-modal. So you can pass all react-native-modal properties inside "modalProps" to modify styling and animations.

Also, you can customize the styling of the popup by passing an object like this in the style prop of the Popup component:

```js
{
    container: {},
    itemContainer: {},
    image: {},
    itemText: {},
    headerContainer: {},
    titleText: {},
    subtitleText: {},
    cancelButtonContainer: {},
    cancelButtonText: {},
    separatorStyle: {},
    activityIndicatorContainer: {}
}
```


## Authors

This library is forked from [React-Native-Map-Link](https://github.com/leanmotherfuckers/react-native-map-link) but optmized for generic things not only maps

* Guilherme Bais, [@guilhermebais](https://www.instagram.com/guilhermebais/)


