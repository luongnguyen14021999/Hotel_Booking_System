import React from 'react'

export default function Feature({children, feature}) {
  return (
    <header className={feature}>
      {children}
    </header>
  )
}

Feature.defaultProps = {
    feature: "defaultFeature"
};
