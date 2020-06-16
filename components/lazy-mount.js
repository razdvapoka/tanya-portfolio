import { Box } from "pss-components";
import React, { useState, useRef } from "react";
import { useInView } from "react-hook-inview";

const LazyMount = ({ component: Component = Box, children, ...rest }) => {
  const elementRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

  const mount = () => {
    setIsInViewport(true);
  };

  useInView({
    target: elementRef,
    onEnter: mount,
    unobserveOnEnter: false
  });

  return (
    <Component ref={elementRef} {...rest}>
      {isInViewport ? children : null}
    </Component>
  );
};

export default LazyMount;
