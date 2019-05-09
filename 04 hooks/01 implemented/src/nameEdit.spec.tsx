import * as React from "react";
import { NameEditComponent } from "./nameEdit";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

describe("NameEditComponent", () => {
  it("It should update state on OnChange", () => {
    // Arrange
    const props = {
      initialUserName: "",
      onNameUpdated: jest.fn()
    };

    /*
     * Wrap any code rendering and triggering updates to your components into `act()` calls.
     *
     * Ensures that the behavior in your tests matches what happens in the browser
     * more closely by executing pending `useEffect`s before returning. This also
    * reduces the amount of re-renders done.
    */
    // Act
    const component = shallow(<NameEditComponent {...props} />);

    act(() => {
      component.find("input").simulate("change", {
        target: {
          value: "updated"
        }
      });  
    })

    act(() => {
      component.find("button").simulate("click");
    });

    // Assert
    expect(props.onNameUpdated).toHaveBeenCalledWith("updated");
  });
});
