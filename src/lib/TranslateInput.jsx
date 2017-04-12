import React from 'react';
import I18n from './I18n';
import BaseComponent from './Base';

export default class TranslateInput extends BaseComponent {
  static propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
  };

  render() {
    const { placeholder, value } = this.props;
    const props = {
      ...this.props,
      placeholder: I18n._translate(placeholder),
      value: I18n._translate(value),
    };

    return <input {...props} />;
  }
}
