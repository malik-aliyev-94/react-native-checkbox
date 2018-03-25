import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const Icon = () => (
  <Image
    style={{width: 14, height: 14, margin: 2}}
    source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAe1BMVEUAAAAAZuYAbfAAbfEAbfAAbfAAbfAAbu8AbfAAbO8Abe8Abe8AbvAAVf8AbfAAb+8AbfAAbPAAgP8Ab+4Abe4AbfAAbfAAbfAAbPIAa/IAbPAAZu4AbvIAbvEAbfAAbfAAbfAAa/IAbPEAbfEAbPAAbfEAbPAAbfAAAAAlF1HIAAAAJ3RSTlMACpt+veD1QfRAP2J7A/M+4qcEPE35q/I7TK4POkr47/E5SThCsTRVHHGTAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+IDFg4JDQBniEQAAABcSURBVBjTY2AgDTAyMaPyWdRZ0fhs7Kh8Dk40PheQ5ubhhfH5+EEMAXVBIShfGCwjIqouJgTii0tA9UqKqktJA/kycNNk5dTl1RUUkcxXklNXUEZxoYqqGgn+AwBypgW9GPRC0wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0yMlQxNDowOToxMyswMTowMNetl44AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMjJUMTQ6MDk6MTMrMDE6MDCm8C8yAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='}}
  />
);

const Checked = () => (
  <View style={{width: 20, height: 20, backgroundColor: 'transparent', borderColor: '#006DF0', borderWidth: 1}}>
    <Icon />
  </View>
);

const NotChecked = () => (
  <View style={{width: 20, height: 20, backgroundColor: 'transparent', borderColor: '#ccc', borderWidth: 1}}></View>
);

export default class CheckBox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      checked: props.checked ? props.checked : false,
      value: props.value ? props.value : '',
      name: props.name ? props.name : '',
      disabled: props.disabled ? props.disabled : false,
      onChange: props.onChange ? props.onChange : () => {},
      content: (props.content && ['append', 'prepend'].includes(props.content)) ? props.content : 'append'
    };
  }

  componentWillReceiveProps(props) {
    let changed = false;
    if ( this.state.checked != props.checked )
      changed = true;

    this.setState({
      checked: props.checked ? props.checked : false,
      value: props.value ? props.value : '',
      name: props.name ? props.name : '',
      disabled: props.disabled ? props.disabled : false,
      onChange: props.onChange ? props.onChange : () => {},
      content: (props.content && ['append', 'prepend'].includes(props.content)) ? props.content : 'append'
    });

    if (changed)
      this.state.onChange({
        'name': this.state.name,
        'checked': this.state.checked,
        'value': this.state.value
      });
  }

  toggle () {
    if ( !this.state.disabled ) {
      this.setState({
        checked: !this.state.checked
      });
      this.state.onChange({
        'name': this.state.name,
        'checked': this.state.checked,
        'value': this.state.value
      });
    }

  }

  render () {
    return (
      <TouchableOpacity style={[{padding: 20, alignItems: 'center', opacity: this.state.disabled ? .5 : 1}, this.props.style]} onPress={this.toggle.bind(this)} activeOpacity={this.state.disabled ? .5 : 1}>
      { this.state.content == 'prepend' && this.props.children }
      { this.state.checked ? this.props.componentChecked ? this.props.componentChecked : <Checked /> : this.props.componentNotChecked ? this.props.componentNotChecked : <NotChecked /> }
      { this.state.content == 'append' && this.props.children }
      </TouchableOpacity>
    );
  }

}
