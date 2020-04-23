import React from 'react';
import PropTypes from 'prop-types';

const defaultDelim = '|';

const TitleContext = React.createContext({
  siteName: '',
  delim: defaultDelim
});

class Title extends React.Component {
  componentDidMount() {
    const { delim, siteName } = this.context;
    const { render } = this.props;
    if (typeof siteName === 'undefined') {
      document.title = render;
    } else {
      document.title = render + ' ' + delim + ' ' + siteName;
    }
  }
  render() { return null; }
}

Title.contextType = TitleContext;

Title.propTypes = {
  render: PropTypes.string.isRequired
}

class TitleProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { siteName, delim } = this.props;
    if (typeof delim === 'undefined') {
      delim = defaultDelim;
    }
    return (
      <TitleContext.Provider value={{siteName: siteName, delim: delim}}>
        {this.props.children}
      </TitleContext.Provider>
    )
  }
}

TitleProvider.propTypes = {
  children: PropTypes.any,
  delim: PropTypes.string,
  siteName: PropTypes.string
}

export default Title;
export { TitleProvider };