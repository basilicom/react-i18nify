import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class TranslateInput extends BaseComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    dangerousHTML: PropTypes.bool,
  };
  static defaultProps = {
    placeholder: '',
    value: '',
    dangerousHTML: false,
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
