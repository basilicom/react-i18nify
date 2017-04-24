import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    dangerousHTML: PropTypes.bool,
  };
  static defaultProps = {
    dangerousHTML: false,
  };

  render() {
    const { value, dangerousHTML } = this.props;
    const translation = I18n._translate(value);
    const props = {
      ...this.props,
    };
    delete props.value;
    delete props.dangerousHTML;
    if (dangerousHTML) {
      return <span {...props} dangerouslySetInnerHTML={{ __html: translation }} />;
    }
    return <span {...props}>{translation}</span>;
  }
}
