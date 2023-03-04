import Error from "../Components/Error";
import { render, screen  } from "@testing-library/react";


test("should render the error message correctly", () => {
    render(<Error errorType="error" message="Something went wrong..."  />);

    const errorCompoentMessage = screen.getByText(/Something went wrong.../)

    expect(errorCompoentMessage).toBeInTheDocument();

})  