import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const colors = {
  black: "#464646",
  gray: "#BBC4CC",
  lightGray: "#ACBBCB",
  lightBlue: "#ECF2F8"
};

export default class ActionSheetPlus extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    showHeader: PropTypes.bool,
    onBackButtonPress: PropTypes.func,
    onAppPressed: PropTypes.func,
    style: PropTypes.object,
    modalProps: PropTypes.object,
    options: PropTypes.object.isRequired,
    itemsTitle: PropTypes.array.isRequired,
    itemsImage: PropTypes.array,
    itemsPress: PropTypes.func
  };

  static defaultProps = {
    isVisible: false,
    showHeader: true,
    style: {
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
    },
    modalProps: {},
    options: {},
    onBackButtonPressed: () => {},
    onCancelPressed: () => {},
    onAppPressed: () => {},
    itemsTitle: [],
    itemsImage: [],
    itemsPress: () => {}
  };

  _renderHeader = () => {
    const { showHeader, options } = this.props;
    if (!showHeader) {
      return null;
    }

    const dialogTitle =
      options.dialogTitle && options.dialogTitle.length
        ? options.dialogTitle
        : "Select Your Option";
    const dialogMessage =
      options.dialogMessage && options.dialogMessage.length
        ? options.dialogMessage
        : "What option would you like to use?";

    return (
      <View style={[styles.headerContainer, this.props.style.headerContainer]}>
        <Text style={[styles.titleText, this.props.style.titleText]}>
          {dialogTitle}
        </Text>
        {dialogMessage && dialogMessage.length ? (
          <Text style={[styles.subtitleText, this.props.style.subtitleText]}>
            {dialogMessage}
          </Text>
        ) : null}
      </View>
    );
  };

  _renderApps = () => {
    const { itemsTitle } = this.props;
    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separatorStyle, this.props.style.separatorStyle]}
          />
        )}
        data={itemsTitle}
        renderItem={this._renderAppItem}
        keyExtractor={item => item}
      />
    );
  };

  _renderAppItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item}
        style={[styles.itemContainer, this.props.style.itemContainer]}
        onPress={() =>
          this.props.itemsPress(this.props.itemsTitle.indexOf(item))
        }
      >
        <View>
          <Image
            style={[styles.image, this.props.style.image]}
            source={this.props.itemsImage[this.props.itemsTitle.indexOf(item)]}
          />
        </View>
        <Text style={[styles.itemText, this.props.style.itemText]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  _renderCancelButton = () => {
    const { options } = this.props;
    const cancelText =
      options.cancelText && options.cancelText.length
        ? options.cancelText
        : "Cancel";
    return (
      <TouchableOpacity
        style={[
          styles.cancelButtonContainer,
          this.props.style.cancelButtonContainer
        ]}
        onPress={this.props.onCancelPressed}
      >
        <Text
          style={[styles.cancelButtonText, this.props.style.cancelButtonText]}
        >
          {cancelText}
        </Text>
      </TouchableOpacity>
    );
  };

  _onAppPressed = ({ app }) => {
    // showLocation({ ...this.props.options, app }) CHANGE HERE
    this.props.onAppPressed(app);
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropColor={colors.black}
        animationIn="slideInUp"
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onBackButtonPress={this.props.onBackButtonPressed}
        {...this.props.modalProps}
      >
        <View style={[styles.container, this.props.style.container]}>
          {this._renderHeader()}
          {this._renderApps()}
          {this._renderCancelButton()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    maxHeight: SCREEN_HEIGHT * 0.6
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginLeft: 15
  },
  headerContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: colors.lightBlue,
    padding: 15
  },
  titleText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.black
  },
  subtitleText: {
    fontSize: 12,
    color: colors.lightGray,
    textAlign: "center",
    marginTop: 10
  },
  cancelButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "transparent",
    borderTopColor: colors.lightBlue
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray
  },
  separatorStyle: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightBlue
  },
  activityIndicatorContainer: {
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  }
});
