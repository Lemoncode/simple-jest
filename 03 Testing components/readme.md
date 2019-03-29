# Testing components

We will take as starting point _02 Testin Actions_.

- Let's install dependencies:

```bash
npm install
```

- We can work with `jest` and `enzyme` together because `enzyme` makes it easier to assert, manipulate, and traverse your React Components' output.

- Let's create _config/test/setupTest.js_ to configure enzyme adapter:

### ./config/test/setupTest.js

```javascript
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
enzyme.configure({ adapter: new Adapter() });
```

- Update `jest` config:

### ./config/test/jest.json

```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "setupFiles": [
-   "<rootDir>/config/test/polyfills.js"
+   "<rootDir>/config/test/polyfills.js",
+   "<rootDir>/config/test/setupTest.js"
  ],
  "restoreMocks": true
+ "restoreMocks": true,
+ "snapshotSerializers": [
+   "enzyme-to-json/serializer"
+ ]
}
```

- Let's add a snapshot test to the header component
  (./src/common/components/panel/components/header)

_./src/common/components/panel/components/header.spec.tsx_

```typescript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('common/components/panel/header tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test title',
    };

    // Act
    const component = shallow(<Header {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
```

- When we run this test, it creates a snapshot test file:

> NOTE: We should include this file in repository so everybody can view this file in PR.

_./src/common/components/panel/components/**snapshots**/header.spec.tsx.snap_

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[
  `common/components/panel/header tests should render as expected when passing required properties 1`
] = `
<div
  className="card-header"
>
  <h3
    className="panel-title"
  >
    test title
  </h3>
</div>
`;
```

- Let's start with proper component testing, we are going to test the
_Input_ (./src/common/components/form/input.tsx) component we have created and ensure that when ever the input changes an OnChange callback is triggered.

_./src/common/components/form/input.spec.tsx

```typescript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from './input';

describe('common/components/form/input specs', () => {
  it('should call to onChange prop when simulate input onChange', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
      value: 'test value',
      onChange: jest.fn(),
      onBlur: () => {},
      error: 'test error',
      type: 'test type',
    };

    // Act
    const component = shallow(<Input {...props} />);

    component.find('input').simulate('change', {
      target: {
        name: 'test name',
        value: 'updated value',
      },
    });

    // Assert
    (expect(props.onChange).toHaveBeenCalledWith(
      'test name',
      'updated value'
    ));
  });
});
```


