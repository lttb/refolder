# refolder

Fold the render props and HOCs.

```js
import fold from 'refolder'

const withValue = self => lift => lift({
  ...self.props,
  value: 1,
})

const enhance = fold(
  withValue,
)

const Button = ({children, value}) => (
  <>
    <p>value: {value}</p>

    <button>
      {children}
    </button>
  </>
)


```
