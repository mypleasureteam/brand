/**
 * MyPleasure | "brand"
 * --------------------
 * Higher-order component to imbue screen
 * with animations to remove from view when viewed.
 * Note that composed components using MotionScreen
 * should implement a `style` prop with value `props.style`
 * on the rendered DOM element they wish to animate out.
 *
 * i.e.
 * const ComposedComponent = props => {
 *   return (
 *     <section style={props.style}>I will slide out!</section>
 *   );
 * }
 *
 * export default MotionScreen(ComposedComponent);
 */

import {Motion, spring} from 'react-motion';
import React, {Component} from 'react';

// Condition for animating: 'viewed' array in props
// contains 'id' of current component.
const animStyleConditions = props => {
  return {
    y: spring(props.viewed.includes(props.id) ? -100 : 0),
    o: spring(props.viewed.includes(props.id) ? 0 : 1)
  };
}

const animStyleProps = (y, o) => {
  return {
    WebkitTransform: `translate3d(0, ${y}%, 0)`,
    transform: `translate3d(0, ${y}%, 0)`,
    opacity: `${o}`
  };
}

const MotionScreen = Screen => class extends Component {
  render() {
    return (
      <Motion style={animStyleConditions(this.props)}>
        {({y, o}) =>
          <Screen {...this.props} style={animStyleProps(y, o)} />
        }
      </Motion>
    );
  }
}

export default MotionScreen;
