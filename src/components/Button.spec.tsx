import { describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("should render button with given label", () => {
    render(<Button label="Submit" />);
    const button = screen.getByText(/Submit/);
    expect(button).toBeInTheDocument();
  });

  test("should be able to handle click event", () => {
    const onClickHandler = vi.fn();
    render(<Button label="Submit" onClick={onClickHandler} />);
    const button = screen.getByText(/Submit/);
    act(() => {
      fireEvent.click(button);
    });
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
